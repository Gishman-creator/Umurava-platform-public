import { Schema, model, Types, Document } from "mongoose";

export interface IImage extends Document {
    filename: string;
    url: string;
    mimetype: string;
    size: number;
    uploadedBy: Types.ObjectId;
    uploadDate: Date;
    canModify(userId: string): boolean;
}

const ImageSchema = new Schema({
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
    uploadedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    uploadDate: {
        type: Date,
        default: Date.now
    }
});

ImageSchema.methods.canModify = function(userId: string): boolean {
    return this.uploadedBy.toString() === userId;
};

export default model<IImage>('Image', ImageSchema);
