import { Request, Response } from "express";
import { Model, Document } from "mongoose";
import logger from "../utils/logger";
import CloudStorageService from "../services/CloudStorageService";
import fs from "fs";
import path from "path";
import { Readable } from "stream";

export default abstract class BaseController<T extends Document> {
  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const limit = req.params.limit ? parseInt(req.params.limit, 10) : 5;

      // Ensure limit is a valid number and not NaN
      const finalLimit = isNaN(limit) ? 5 : limit;

      const items = await this.model.find().limit(finalLimit);
      res.status(200).json(items);
    } catch (error) {
      logger.error("Error in getAll:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    res.set("ETag", "no-cache");
    res.set("Last-Modified", new Date().toUTCString());

    console.log("Request params:", req.params);
    try {
      const { id, creator_id } = req.params;
      let item;

      if (creator_id) {
        item = await this.model.findOne({ _id: id, creator_id }).lean();
      } else {
        item = await this.model.findById(id);
      }

      console.log(item)

      if (!item) {
        res.status(404).json({ message: "Item not found" });
        return;
      }

      res.status(200).json(item);
    } catch (error) {
      logger.error("Error in getById:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  getByCreatorId = async (req: Request, res: Response): Promise<void> => {
    console.log("Request params:", req.params);
    const limit = req.params.limit ? parseInt(req.params.limit, 10) : 5;

    // Ensure limit is a valid number and not NaN
    const finalLimit = isNaN(limit) ? 5 : limit;

    try {
      const item = await this.model.find({ creator_id: req.params.creator_id }).limit(finalLimit);
      if (!item) {
        res.status(404).json({ message: "Item not found" });
        return;
      }
      res.status(200).json(item);
    } catch (error) {
      logger.error("Error in getById:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  create = async (req: Request, res: Response): Promise<any> => {
    try {
      let fileUrl = "";

      console.log("Request body:", req.body);

      // 1. Input Validation
      const {
        title,
        image,
        deadline,
        duration,
        skills,
        seniority,
        category,
        description,
        contactEmail,
        prize,
        deliverables,
        requirements,
        design,
        creator_id,
        note,
      } = req.body;
      const file = req.file;

      console.log("File:", file);

      // Convert JSON strings to arrays if needed
      const parsedSkills = skills ? JSON.parse(skills) : [];
      const parsedDeliverables = deliverables ? JSON.parse(deliverables) : [];
      const parsedRequirements = requirements ? JSON.parse(requirements) : [];
      const parsedDesign = design ? JSON.parse(design) : [];
      const parsedNote = note ? JSON.parse(note) : [];

      // 2. Handle file upload
      if (file) {
        try {
          fileUrl = await CloudStorageService.uploadFile(file);
          logger.info(`File uploaded successfully, URL: ${fileUrl}`);
        } catch (error) {
          logger.error("Error uploading file:", error);
          return res.status(500).json({
            success: false,
            message: "Failed to upload file",
          });
        }
      }

      // 4. Create the database entry
      const item = await this.model.create({
        title,
        imageUrl: fileUrl,
        deadline,
        duration,
        skills: parsedSkills,
        seniority,
        category,
        description,
        contactEmail,
        prize,
        deliverables: parsedDeliverables,
        requirements: parsedRequirements,
        design: parsedDesign,
        creator_id,
        note: parsedNote,
      });

      return res.status(201).json(item);
    } catch (error) {
      logger.error("Error in create:", error);
      return res.status(400).json({ message: "Invalid data provided" });
    }
  };

  update = async (req: Request, res: Response): Promise<any> => {
    try {
      // 1. Input Validation: Destructure and handle defaults for JSON fields
      const {
        title,
        image,
        deadline,
        duration,
        skills,
        seniority,
        category,
        description,
        contactEmail,
        prize,
        deliverables,
        requirements,
        design,
        creator_id,
        note,
      } = req.body;

      const file = req.file;

      console.log("Body: ", req.body);
      console.log("File:", file);

      // Check if required fields are provided
      if (!title || !deadline || !duration || !category) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      // 2. Parse fields if needed (arrays)
      const parsedSkills = skills ? JSON.parse(skills) : [];
      const parsedDeliverables = deliverables ? JSON.parse(deliverables) : [];
      const parsedRequirements = requirements ? JSON.parse(requirements) : [];
      const parsedDesign = design ? JSON.parse(design) : [];
      const parsedNote = note ? JSON.parse(note) : [];

      // 3. Handle file upload if file is present
      let fileUrl = "";
      if (file) {
        try {
          fileUrl = await CloudStorageService.uploadFile(file);
          logger.info(`File uploaded successfully, URL: ${fileUrl}`);
        } catch (uploadError) {
          logger.error("Error uploading file:", uploadError);
          return res.status(500).json({
            success: false,
            message: "Failed to upload file",
          });
        }
      }

      // 4. Prepare the update object
      const updateData = {
        title,
        imageUrl: fileUrl || image, // fallback to the original image if no new file is uploaded
        deadline,
        duration,
        skills: parsedSkills,
        seniority,
        category,
        description,
        contactEmail,
        prize,
        deliverables: parsedDeliverables,
        requirements: parsedRequirements,
        design: parsedDesign,
        creator_id,
        note: parsedNote,
      };

      // 5. Update the item in the database
      const item = await this.model.findByIdAndUpdate(
        req.params.id,
        updateData,
        {
          new: true, // Ensure the updated document is returned
          runValidators: true, // Run schema validations
        }
      );

      // 6. If item is not found, return 404
      if (!item) {
        return res.status(404).json({ message: "Item not found" });
      }

      // 7. Successfully updated the item
      return res.status(200).json(item);
    } catch (error) {
      // Log the error for debugging purposes
      logger.error("Error in update:", error);

      // Send generic error message to the client
      return res.status(400).json({ message: "Invalid data provided" });
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const item = await this.model.findByIdAndDelete(req.params.id);
      if (!item) {
        res.status(404).json({ message: "Item not found" });
        return;
      }
      res.status(204).send();
    } catch (error) {
      logger.error("Error in delete:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
}
