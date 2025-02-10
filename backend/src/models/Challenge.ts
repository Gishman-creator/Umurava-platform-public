/**
 * @module Challenge
 * @description Challenge model and schema definition
 */

import { Schema, model, Types } from "mongoose";
import { IChallenge, ChallengeStatus } from "../types";
import logger from "../utils/logger";

/**
 * @const ChallengeSchema
 * @description Mongoose schema definition for Challenge
 */
const ChallengeSchema = new Schema({
    title: { 
        type: String, 
        required: [true, 'Title is required'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters']
    },
    duration: {
        type: String,
        required: [true, 'Duration is required']
    },
    deadline: {
        type: Date,
        required: [true, 'Deadline is required']
    },
    imageUrl: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    seniority: {
        type: String,
        required: true,
        enum: ["Beginner", "Intermediate", "Advanced"]
    },
    description: {
        type: String,
        required: [true, 'Challenge description is required'],
        // minlength: [50, 'Description must be at least 50 characters']
    },
    contactEmail: {
        type: String,
        required: [true, 'Contact email is required'],
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    category: {
        type: String,
        required: true
    },
    prize: {
        type: String, // Keeping it as a string since the range format (e.g., "$150-$400") doesn't fit well as a number
        required: true
    },
    deliverables: {
        type: [String],
        required: true
    },
    requirements: {
        type: [String],
        required: true
    },
    design: {
        type: [String],
        required: true
    },
    note: {
        type: [String],
        default: []
    },
    creator_id: {
        type: Types.ObjectId,
        required: [true, 'Creator ID is required'],
        ref: 'User'
    },
    status: {
        type: String,
        enum: ["OPEN", "CLOSED", "IN_PROGRESS"],
        default: "OPEN",
        required: true
    },
    participants: {
        type: Number,
        default: 0,
        min: [0, 'Participants cannot be negative']
    }
}, {
    timestamps: true // This automatically adds createdAt and updatedAt
});
ChallengeSchema.index({ creator_id: 1 });
ChallengeSchema.index({ Deadline: 1 });
ChallengeSchema.index({ Money_Prize: -1 });

ChallengeSchema.statics = {
    async getChallengeStats() {
        try {
            const stats = await this.aggregate([
                {
                    $group: {
                        _id: '$status',
                        count: { $sum: 1 }
                    }
                }
            ]);

            const result = {
                total: 0,
                open: 0,
                ongoing: 0,
                completed: 0
            };

            stats.forEach(({ _id, count }: { _id: keyof typeof result, count: number }) => {
                result[_id] = count;
                result.total += count;
            });

            return result;
        } catch (error) {
            logger.error('Error getting challenge stats:', error);
            throw error;
        }
    },

    async getUserChallengeStats(userId: Types.ObjectId) {
        try {
            const stats = await this.aggregate([
                { $match: { creator_id: userId } },
                {
                    $group: {
                        _id: '$status',
                        count: { $sum: 1 }
                    }
                }
            ]);

            return {
                total: stats.reduce((acc, curr) => acc + curr.count, 0),
                open: stats.find(s => s._id === ChallengeStatus.OPEN)?.count || 0,
                ongoing: stats.find(s => s._id === ChallengeStatus.ONGOING)?.count || 0,
                completed: stats.find(s => s._id === ChallengeStatus.COMPLETED)?.count || 0
            };
        } catch (error) {
            logger.error('Error getting user challenge stats:', error);
            throw error;
        }
    }
};

/**
 * @method isActive
 * @description Check if challenge is currently active
 * @returns {boolean} True if challenge is open
 */
ChallengeSchema.methods.isActive = function(): boolean {
    return this.status === ChallengeStatus.OPEN;
};

/**
 * @method addParticipant
 * @description Increment participant count for challenge
 * @returns {Promise<void>}
 */
ChallengeSchema.methods.addParticipant = async function(): Promise<void> {
    try {
        this.participants += 1;
        await this.save();
    } catch (error) {
        logger.error('Error adding participant:', error);
        throw error;
    }
};

ChallengeSchema.methods.updateStatus = async function(status: ChallengeStatus): Promise<void> {
    try {
        this.status = status;
        await this.save();
    } catch (error) {
        logger.error('Error updating challenge status:', error);
        throw error;
    }
};

ChallengeSchema.post('find', async function (docs: IChallenge[]) {
    docs.forEach((challenge) => {
        if (challenge.deadline && new Date(challenge.deadline) < new Date()) {
            challenge.status = ChallengeStatus.COMPLETED;
        } else if (new Date(challenge.deadline) > new Date() && challenge.status !== ChallengeStatus.COMPLETED) {
            challenge.status = ChallengeStatus.OPEN;
        }
    });
});

ChallengeSchema.post('findOne', async function (doc) {
    if (doc) {
        if (doc.deadline && new Date(doc.deadline) < new Date()) {
            doc.status = ChallengeStatus.COMPLETED;
        } else if (new Date(doc.deadline) > new Date() && doc.status !== ChallengeStatus.COMPLETED) {
            doc.status = ChallengeStatus.OPEN;
        }
    }
});

ChallengeSchema.methods.getRemainingTime = function(): number {
    return this.deadline?.getTime() - new Date().getTime();
};

export default model<IChallenge>('Challenge', ChallengeSchema);
