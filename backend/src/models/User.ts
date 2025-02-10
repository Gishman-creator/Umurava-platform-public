/**
 * @module User
 * @description User model and schema definition
 */

import { Document, Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import { IUser } from "../types";
import logger from "../utils/logger";

/**
 * @interface IUserDocument
 * @extends Document
 * @description Interface for User document with additional Mongoose methods
 */
interface IUserDocument extends Document {
    isModified(path: string): boolean;
    password: string;
}

/**
 * @const UserSchema
 * @description Mongoose schema definition for User
 */
const UserSchema = new Schema<IUser>({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        maxlength: [50, 'Name cannot be more than 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters'],
        select: false
    },
    role: {
        type: String,
        enum: ['talent', 'admin'],
        default: 'user'
    },
    profileImageUrl: {
        type: String,
        default: null
    },
    specialty: {
        type: String,
        required: [true, 'Please add your specialty'],
        trim: true,
        index: true
    },
    
    // User-only attributes
    completedChallenges: [{
        type: Schema.Types.ObjectId,
        ref: 'Challenge',
        default: []
    }],
    ongoingChallenges: [{
        type: Schema.Types.ObjectId,
        ref: 'Challenge',
        default: []
    }],

    // Admin-only attributes
    createdChallenges: [{
        type: Schema.Types.ObjectId,
        ref: 'Challenge',
        default: []
    }],
    
}, {
    timestamps: true,
});

/**
 * @method isAdmin
 * @description Checks if user has admin role
 * @returns {boolean} True if user is admin
 */
UserSchema.methods.isAdmin = function(): boolean {
    return this.role === 'admin';
};

/**
 * @method isUser
 * @description Checks if user has regular user role
 * @returns {boolean} True if user is regular user
 */
UserSchema.methods.isUser = function(): boolean {
    return this.role === 'user';
};

UserSchema.pre('save', function(next) {
    if (this.isModified('role')) {
        if (this.role === 'user') {
            this.createdChallenges = [];
        } else if (this.role === 'admin') {
            this.completedChallenges = [];
            this.ongoingChallenges = [];
        }
    }
    next();
});

UserSchema.pre<IUserDocument>('save', async function (next) {
    try {
        if (!this.isModified('password')) return next();

        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        logger.error('Error hashing password:', error);
        next(error as Error);
    }
});

UserSchema.methods.comparePassword = async function (enteredPassword: string): Promise<boolean> {
    try {
        return await bcrypt.compare(enteredPassword, this.password);
    } catch (error) {
        logger.error('Error comparing passwords:', error);
        throw error;
    }
}

// Add validation
UserSchema.path('email').validate(async function(email: string) {
    const emailCount = await model('User').countDocuments({ email });
    return !emailCount;
}, 'Email already exists');

// Add method to get challenge count
UserSchema.methods.getChallengeCount = function(type: 'completed' | 'ongoing' | 'created'): number {
    switch(type) {
        case 'completed':
            return this.completedChallenges?.length || 0;
        case 'ongoing':
            return this.ongoingChallenges?.length || 0;
        case 'created':
            return this.createdChallenges?.length || 0;
        default:
            return 0;
    }
};

// Add text index for specialty
UserSchema.index({ specialty: 'text' });

export default model<IUser>('User', UserSchema);


