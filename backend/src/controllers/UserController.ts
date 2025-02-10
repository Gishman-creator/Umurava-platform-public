/**
 * @module UserController
 * @description Handles user-related HTTP requests
 */

import { Request, Response, NextFunction } from "express";
import { Model, Types, Document } from "mongoose";
import BaseController from "./BaseController";
import bcrypt from "bcryptjs";
import { AdminRequestStatus } from "../types";
import jwt from "jsonwebtoken";
import config from "../config/config";
import User from "../models/User";
import { IUser, File } from "../types";
import logger from "../utils/logger";
import { upload } from "@/utils/gridfs";
import {
  AuthenticationError,
  AuthorizationError,
  ValidationError,
  ErrorResponse,
  asyncHandler,
} from "../utils/errorHandler";
import EmailService from "../services/EmailService";
// import AppwriteService from '../services/AppwriteService';
import { AuthRequest } from "../types";
import { uploadImage } from "../middleware/upload";
import mongoose from "mongoose";
import CloudStorageService from "../services/CloudStorageService";
import { sign } from "jsonwebtoken";

declare module "express" {
  interface Request {
    user?: IUser;
  }
}

interface IUserModel extends Model<IUser> {
  comparePassword(password: string): Promise<boolean>;
}

export default class UserController extends BaseController<IUser> {
  /**
   * @constructor
   * @description Initialize UserController with User model
   */
  constructor() {
    super(User as unknown as Model<IUser>);
  }

  /**
   * @method login
   * @description Authenticate user and generate JWT token
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @returns {Promise<void>}
   */
  login = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
      console.log("Login attempt:", { email }); // Add logging

      const user = (await User.findOne({ email }).select(
        "+password"
      )) as IUser & Document;

      if (!user) {
        console.log("User not found:", { email }); // Add logging
        throw new ErrorResponse("Invalid credentials", 401);
      }

    //   if (!user.isEmailVerified) {
    //     throw new ErrorResponse("Please verify your email first", 403);
    //   }

      const isMatch = await user.comparePassword(password);
      console.log("Password match:", isMatch); // Add logging

      if (!isMatch) {
        throw new ErrorResponse("Invalid credentials", 401);
      }

      // Generate JWT token
      const token = jwt.sign({ id: user._id }, config.jwtSecret as jwt.Secret, {
        expiresIn: "30d",
      });

      res.status(200).json({
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          imageUrl: user.profileImageUrl,
        },
      });
    } catch (error) {
      console.error("Login error:", error); // Add logging
      throw error;
    }
  });

  /**
   * @method uploadProfilePicture
   * @description Upload and update user's profile picture
   * @param {Request} req - Express request object with file
   * @param {Response} res - Express response object
   * @throws {AuthenticationError} If user not found
   * @returns {Promise<void>}
   */
  uploadProfilePicture = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = (await User.findById(req.user?._id)) as IUser;
      if (!user) {
        throw new AuthenticationError("User not found");
      }

      if (!req.file) {
        throw new ValidationError("No file uploaded");
      }

      // Delete old image if exists
      if (user.profileImageUrl) {
        await CloudStorageService.deleteFile(user.profileImageUrl);
      }

      // Upload new image
      const fileUrl = await CloudStorageService.uploadFile(req.file);

      // Update user
      user.profileImageUrl = fileUrl;
      await user.save();

      res.status(200).json({
        success: true,
        data: {
          imageUrl: fileUrl,
        },
      });
    } catch (error) {
      logger.error("Error uploading profile picture:", error);
      throw error;
    }
  };

  getUserStats = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = (await User.findById(req.user?._id)
        .populate("completedChallenges")
        .populate("ongoingChallenges")
        .populate("createdChallenges")) as IUser;

      if (!user) {
        throw new AuthenticationError("User not found");
      }

      res.status(200).json({
        success: true,
        data: {
          completedChallenges: {
            count: user.getChallengeCount("completed"),
            challenges: user.completedChallenges,
          },
          ongoingChallenges: {
            count: user.getChallengeCount("ongoing"),
            challenges: user.ongoingChallenges,
          },
          createdChallenges: {
            count: user.getChallengeCount("created"),
            challenges: user.createdChallenges,
          },
        },
      });
    } catch (error) {
      logger.error("Error getting user stats:", error);
      throw error;
    }
  };

  updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const updateData = { ...req.body };
      const currentUser = req.user as IUser;

      // Check if user exists
      const user = (await User.findById(id)) as IUser;
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      // Only admin can change roles
      if (updateData.role && !currentUser.isAdmin()) {
        delete updateData.role;
      }

      // Handle password update
      if (updateData.password) {
        const salt = await bcrypt.genSalt(10);
        updateData.password = await bcrypt.hash(updateData.password, salt);
      }

      // Validate user-specific fields
      if (user.role === "user") {
        // User can only update specific fields
        const allowedFields = ["name", "email", "password"];
        Object.keys(updateData).forEach((key) => {
          if (!allowedFields.includes(key)) {
            delete updateData[key];
          }
        });
      }

      // Validate admin-specific fields
      if (user.role === "admin" && !currentUser.isAdmin()) {
        const adminFields = ["managedUsers"];
        adminFields.forEach((field) => {
          if (field in updateData) {
            delete updateData[field];
          }
        });
      }

      // Update challenge-related fields with new names
      if (updateData.completedchallenge !== undefined) {
        user.completedChallenges = updateData.completedChallenges;
      }
      if (updateData.OngoingChallenge !== undefined) {
        user.ongoingChallenges = updateData.ongoingChallenges;
      }
      if (updateData.challengecreated !== undefined) {
        user.createdChallenges = updateData.createdChallenges;
      }

      // Update user
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { $set: updateData },
        {
          new: true,
          runValidators: true,
          context: "query",
        }
      ).select("-password");

      if (!updatedUser) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      // Log the update
      logger.info(`User ${id} updated by ${currentUser._id}`);

      res.status(200).json({
        message: "User updated successfully",
        user: updatedUser,
      });
    } catch (error: unknown) {
      logger.error("Error in updateUser:", error);
      if (
        error instanceof Error &&
        "name" in error &&
        error.name === "ValidationError"
      ) {
        const validationError = error as unknown as {
          errors: { message: string }[];
        };
        res.status(400).json({
          message: "Invalid data provided",
          errors: Object.values(validationError.errors).map(
            (err) => err.message
          ),
        });
        return;
      }
      res.status(500).json({ message: "Internal server error" });
    }
  };

  // Add method to update user stats
  updateUserStats = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { completedchallenge, OngoingChallenge, challengecreated } =
        req.body;

      const user = (await User.findById(id)) as IUser;
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      if (user.role === "user") {
        if (completedchallenge !== undefined) {
          user.completedChallenges = completedchallenge;
        }
        if (OngoingChallenge !== undefined) {
          user.ongoingChallenges = OngoingChallenge;
        }
      }

      if (user.role === "admin" && challengecreated !== undefined) {
        user.challengecreated = challengecreated;
      }

      await user.save();
      res.status(200).json({
        message: "User stats updated successfully",
        user,
      });
    } catch (error) {
      logger.error("Error in updateUserStats:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  // requestAdminRole = async (req: Request, res: Response): Promise<void> => {
  //     try {
  //         const userId = req.user?._id;
  //         const user = await User.findById(userId) as IUser;

  //         if (!user) {
  //             res.status(404).json({ message: 'User not found' });
  //             return;
  //         }

  //         await user.requestAdminRole();
  //         res.status(200).json({
  //             message: 'Admin role request submitted successfully',
  //             status: user.adminRequest?.status
  //         });
  //     } catch (error) {
  //         logger.error('Error in requestAdminRole:', error);
  //         res.status(400).json({ message: error instanceof Error ? error.message : 'Error processing request' });
  //     }
  // };

  // processAdminRequest = async (req: Request, res: Response): Promise<void> => {
  //     try {
  //         const { userId } = req.params;
  //         const { status, reason } = req.body;
  //         const superUser = req.user as IUser;

  //         if (!superUser || !superUser.isSuper()) {
  //             res.status(403).json({ message: 'Only super users can process admin requests' });
  //             return;
  //         }

  //         const user = await User.findById(userId) as IUser;
  //         if (!user) {
  //             res.status(404).json({ message: 'User not found' });
  //             return;
  //         }

  //         if (user.adminRequest?.status !== AdminRequestStatus.PENDING) {
  //             res.status(400).json({ message: 'No pending admin request found' });
  //             return;
  //         }

  //         user.adminRequest = {
  //             ...user.adminRequest,
  //             status,
  //             processedBy: superUser._id as Types.ObjectId,
  //             processedDate: new Date(),
  //             reason
  //         };

  //         if (status === AdminRequestStatus.APPROVED) {
  //             user.role = 'admin';
  //         }

  //         await user.save();
  //         res.status(200).json({
  //             message: `Admin request ${status}`,
  //             user
  //         });
  //     } catch (error) {
  //         logger.error('Error in processAdminRequest:', error);
  //         res.status(500).json({ message: 'Internal server error' });
  //     }
  // };

  // getPendingAdminRequests = async (req: Request, res: Response): Promise<void> => {
  //     try {
  //         const superUser = req.user as IUser;
  //         if (!superUser || !superUser.isSuper()) {
  //             res.status(403).json({ message: 'Only super users can view pending requests' });
  //             return;
  //         }

  //         const pendingRequests = await User.find({
  //             'adminRequest.status': AdminRequestStatus.PENDING
  //         }).select('-password');

  //         res.status(200).json(pendingRequests);
  //     } catch (error) {
  //         logger.error('Error in getPendingAdminRequests:', error);
  //         res.status(500).json({ message: 'Internal server error' });
  //     }
  // };

  searchUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const { query } = req.query; // Get search query from request
      if (typeof query !== "string") {
        throw new Error("Invalid query type");
      }
      const users = (await User.find({ $text: { $search: query } }).select(
        "-password"
      )) as IUser[];
      res.status(200).json(users);
    } catch (error) {
      logger.error("Error in searchUsers:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  register = asyncHandler(async (req: AuthRequest, res: Response) => {
    let createdUser: IUser | null = null;
    let fileUrl: string | null = null;

    try {
      // 1. Input Validation
      const { email, password, name, specialty, role, photo } = req.body;
      const file = req.file;

      if (!email || !password || !name || !specialty || !role) {
        throw new ValidationError("Please provide all required fields");
      }

      // 2. Email Format Validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new ValidationError("Please provide a valid email address");
      }

      // 3. Password Strength Validation
      if (password.length < 8) {
        throw new ValidationError(
          "Password must be at least 8 characters long"
        );
      }
      if (
        !/[A-Z]/.test(password) ||
        !/[a-z]/.test(password) ||
        !/[0-9]/.test(password)
      ) {
        throw new ValidationError(
          "Password must contain uppercase, lowercase and numbers"
        );
      }

      // 4. Check for Existing User
      const existingUser = await User.findOne({
        $or: [{ email: email.toLowerCase() }],
      });

      if (existingUser) {
        console.log("Email already registered");
        return res.status(500).json({
          success: false,
          message: "Email already registered",
        });
        throw new Error("Email already registered");
      }

      // 5. File Upload Validation
      if (req.file) {
        // Validate file size (e.g., 5MB limit)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (req.file.size > maxSize) {
          return res.status(500).json({
            success: false,
            message: "File size must be less than 5MB",
          });
          throw new ValidationError("File size must be less than 5MB");
        }

        try {
          fileUrl = await CloudStorageService.uploadFile(req.file);
          logger.info(`File uploaded successfully, URL: ${fileUrl}`);
        } catch (error) {
          logger.error("Error uploading file:", error);
          return res.status(500).json({
            success: false,
            message: "Failed to upload profile image",
          });
          throw new ValidationError("Failed to upload profile image");
        }
      }

      // 6. Create User
      createdUser = await User.create({
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password, // Password will be hashed by mongoose pre-save hook
        specialty: specialty.trim(),
        profileImageUrl: fileUrl,
        role: role,
      });

      // 7. Generate Token and Send Response
      const token = this.generateToken(createdUser);

      res.status(201).json({
        success: true,
        message: "Registration successful",
        data: {
          token,
          user: {
            _id: createdUser._id,
            name: createdUser.name,
            email: createdUser.email,
            specialty: createdUser.specialty,
            profileImageUrl: createdUser.profileImageUrl,
            role: createdUser.role,
          },
        },
      });
    } catch (error) {
      // 8. Clean up on Error
      if (fileUrl) {
        try {
          await CloudStorageService.deleteFile(fileUrl);
        } catch (deleteError) {
          logger.error("Error cleaning up uploaded file:", deleteError);
        }
      }

      // Ensure `error` is an instance of Error before accessing its properties
      if (error instanceof Error) {
        logger.error("Registration error:", error.message);
        logger.error("Stack trace:", error.stack);
        logger.error("Stack trace:", error);
      } else {
        logger.error("Unknown error:", error); // If `error` is not an instance of Error
      }

      if (error instanceof ValidationError) {
        console.log("Validation error:", error.message);
        res.status(400).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Registration failed. Please try again later.",
        });
      }
    }
  });

  // Comment out these methods
  /*
    verifyEmail = asyncHandler(async (req: Request, res: Response) => {
        const { token } = req.params;

        const decoded = jwt.verify(token, config.jwtSecret) as { userId: string };
        const user = await User.findById(decoded.userId) as IUser & Document;

        if (!user) {
            throw new ErrorResponse('Invalid verification token', 400);
        }

        user.isEmailVerified = true;
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Email verified successfully'
        });
    });

    resendVerificationEmail = asyncHandler(async (req: Request, res: Response) => {
        const { email } = req.body;

        if (!email) {
            throw new ValidationError('Please provide an email address');
        }

        const user = await User.findOne({ email });

        if (!user) {
            throw new ValidationError('User not found');
        }

        if (user.isEmailVerified) {
            throw new ValidationError('Email is already verified');
        }

        // Send verification email
        await EmailService.sendVerificationEmail(
            user.email,
            user.name,
            (user._id as unknown as string)
        );

        res.status(200).json({
            success: true,
            message: 'Verification email has been resent. Please check your inbox.'
        });
    });
    */

  // Add ownership check middleware
  checkImageOwnership = asyncHandler(
    async (req: AuthRequest, res: Response, next: NextFunction) => {
      const user = await User.findById(req.params.userId);

      if (!user) {
        throw new ErrorResponse("User not found", 404);
      }

      if (
        typeof user._id === "string" &&
        user._id.toString() !== req.user?._id.toString()
      ) {
        throw new ErrorResponse("Not authorized to modify this image", 403);
      }

      next();
    }
  );

  // Update profile picture with ownership check

  resendVerificationEmail = asyncHandler(
    async (req: Request, res: Response) => {
      const { email } = req.body;

      if (!email) {
        throw new ValidationError("Please provide an email address");
      }

      const user = await User.findOne({ email });

      if (!user) {
        throw new ValidationError("User not found");
      }

      if (user.isEmailVerified) {
        throw new ValidationError("Email is already verified");
      }

      // Send verification email
      await EmailService.sendVerificationEmail(
        user.email,
        user.name,
        user._id as unknown as string
      );

      res.status(200).json({
        success: true,
        message: "Verification email has been resent. Please check your inbox.",
      });
    }
  );

  searchBySpecialty = asyncHandler(async (req: Request, res: Response) => {
    const { specialty } = req.query;

    if (!specialty || typeof specialty !== "string") {
      throw new ValidationError("Specialty search term is required");
    }

    // Case-insensitive search with partial matching
    const users = await User.find({
      specialty: {
        $regex: specialty,
        $options: "i",
      },
    }).select("-password");

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  });

  // Add this method inside the UserController class
  private generateToken(user: IUser): string {
    return sign(
      { id: user._id, role: user.role },
      String(config.jwtSecret),
      { expiresIn: "24h" } // Use literal string instead
    );
  }
}
