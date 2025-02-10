import { Schema, model, Document } from "mongoose";
import logger from "../utils/logger";

export interface IVideo extends Document {
    filename: string;
    url: string;
    mimetype: string;
    size: number;
    duration: number;
    uploadDate: Date;
}

const VideoSchema = new Schema({
    filename: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true,
        unique: true
    },
    mimetype: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    duration: {
        type: Number,
        default: 0
    },
    uploadDate: {
        type: Date,
        default: Date.now
    }
});

// Add text index for better search
VideoSchema.index({ filename: 'text' });

export default model<IVideo>('Video', VideoSchema);
