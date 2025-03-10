import { Model, Types } from 'mongoose';
import BaseService from './BaseService';
import User from '../models/User';
import { IUser, AdminRequestStatus, File } from '../types';
import { ValidationError, AuthenticationError, AuthorizationError } from '../utils/errorHandler';
import jwt from 'jsonwebtoken';
import config from '../config/config';

export default class UserService extends BaseService<IUser> {
    constructor() {
        super(User as Model<IUser>);
    }

    // async login(email: string, password: string) {
    //     const user = await User.findOne({ email }).select('+password');
        
    //     if (!user || !(await user.comparePassword(password))) {
    //         throw new AuthenticationError('Invalid credentials');
    //     }

    //     const token = jwt.sign(
    //         { id: user._id },
    //         config.jwtSecret,
    //         { expiresIn: config.jwtExpiresIn }
    //     );

    //     return {
    //         token,
    //         user: {
    //             _id: user._id,
    //             name: user.name,
    //             email: user.email,
    //             role: user.role
    //         }
    //     };
    // }

    async uploadProfilePicture(userId: string, file: File) {
        const user = await this.findById(userId);

        user.picture = {
            fileId: new Types.ObjectId(file.id),
            metadata: {
                filename: file.metadata.originalName,
                length: file.metadata.size,
                contentType: file.metadata.contentType,
                uploadDate: file.metadata.uploadDate
            }
        };

        await user.save();
        return user;
    }

    async updateUserStats(userId: string, stats: Partial<{
        completedchallenge: number;
        OngoingChallenge: number;
        challengecreated: number;
    }>) {
        const user = await this.findById(userId);

        if (user.role === 'talent') {
            if ('completedchallenge' in stats) {
                user.completedChallenges = [new Types.ObjectId(stats.completedchallenge)];
            }
            if ('OngoingChallenge' in stats) {
                user.ongoingChallenges = [new Types.ObjectId(stats.OngoingChallenge)];
            }
        }

        if (user.role === 'admin' && 'challengecreated' in stats) {
            user.challengecreated = stats.challengecreated!;
        }

        await user.save();
        return user;
    }

    async requestAdminRole(userId: string) {
        const user = await this.findById(userId);
        await user.requestAdminRole();
        return user;
    }

    async processAdminRequest(userId: string, superUserId: string, status: AdminRequestStatus, reason?: string) {
        const user = await this.findById(userId);
        const superUser = await this.findById(superUserId);

        if (user.adminRequest?.status !== AdminRequestStatus.PENDING) {
            throw new ValidationError('No pending admin request found');
        }

        user.adminRequest = {
            ...user.adminRequest,
            status,
            processedBy: new Types.ObjectId(superUserId),
            processedDate: new Date(),
            reason
        };

        if (status === AdminRequestStatus.APPROVED) {
            user.role = 'admin';
        }

        await user.save();
        return user;
    }

    async getPendingAdminRequests(superUserId: string) {
        const superUser = await this.findById(superUserId);

        return User.find({
            'adminRequest.status': AdminRequestStatus.PENDING
        }).select('-password');
    }

    async searchUsers(query: string) {
        const regex = new RegExp(query, 'i'); // Case-insensitive search
        return await User.find({
            $or: [
                { name: { $regex: regex } },
                { email: { $regex: regex } }
            ]
        }).select('-password'); // Exclude password from results
    }
}
