import { Document, Types } from 'mongoose';
import { ObjectId } from 'mongodb';
import { Request } from 'express';

export interface ImageMetadata {
    filename: string;
    contentType: string;
    length: number;
    uploadDate: Date;
    metadata?: {
        userId: ObjectId;
        description?: string;
    };
}

export interface File extends Express.Multer.File {
    id: string | Types.ObjectId;
    metadata: {
        userId?: string | Types.ObjectId;
        uploadedBy?: string;
        originalName: string;
        contentType: string;
        size: number;
        uploadDate: Date;
    };
}

export enum AdminRequestStatus {
    PENDING = 'pending',
    APPROVED = 'approved',
    REJECTED = 'rejected',
    NONE = 'none'
}

interface IUserBaseAttributes {
    name: string;
    email: string;
    password: string;
    picture: {
        fileId: ObjectId;
        metadata: ImageMetadata;
    };
    role: 'user' | 'admin';
    created_at: Date;
    updated_at: Date;
    adminRequest?: {
        status: AdminRequestStatus;
        requestDate?: Date;
        processedBy?: ObjectId;
        processedDate?: Date;
        reason?: string;
    };
}

interface IUserOnlyAttributes {
    number: string;
    completedchallenge: ObjectId;
    OngoingChallenge: ObjectId;
}

interface IAdminOnlyAttributes {
    isSuperAdmin?: boolean;
    managedUsers?: number;
    challengecreated: number;
}

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: 'user' | 'admin' | 'super_admin';
    number: string;
    comparePassword(candidatePassword: string): Promise<boolean>;
    profilePicture?: string;
    profileImageUrl?: string;
    picture?: {
        fileId: Types.ObjectId;
        metadata: ImageMetadata;
    };
    completedChallenges: Types.ObjectId[];
    ongoingChallenges: Types.ObjectId[];
    createdChallenges: Types.ObjectId[];
    challengecreated: number;
    adminRequest?: {
        status: AdminRequestStatus;
        requestDate: Date;
        processedBy?: Types.ObjectId;
        processedDate?: Date;
        reason?: string;
    };
    createdAt: Date;
    updatedAt: Date;
    isEmailVerified: boolean;
    emailVerificationToken?: string;
    emailVerificationExpires?: Date;
    appwriteImageUrl?: string;
    appwriteImageId?: string;
    specialty: string;
    
    // Methods
    isSuper(): boolean;
    isAdmin(): boolean;
    isUser(): boolean;
    requestAdminRole(): Promise<void>;
    getChallengeCount(type: 'completed' | 'ongoing' | 'created'): number;
}

interface Description {
    title: string;
    description: string;
   
}

export enum ChallengeStatus {
    OPEN = 'open',
    ONGOING = 'ongoing',
    COMPLETED = 'completed'
}

export interface IChallenge extends Document {
    Title: string;
    deadline: Date;
    contact_email: string;
    Project_Discription: string;
    Brief: string;
    Money_Prize: number;
    Description: Description[];
    participants: number;
    creator_id: Types.ObjectId;
    status: ChallengeStatus;
    createdAt: Date;
    updatedAt: Date;
    isActive(): boolean;
    addParticipant(): Promise<void>;
    updateStatus(status: ChallengeStatus): Promise<void>;
    getRemainingTime(): number;
}

export interface AuthRequest extends Request {
    user?: IUser & {
        _id: Types.ObjectId;
    };
    file?: Express.Multer.File;
}

