import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProgress extends Document {
    guideId: mongoose.Types.ObjectId;
    supabaseUserId: string;
    lastReviewed: Date;
    masteryScore: number; // 0 to 100
    nextReviewDate: Date;
    createdAt: Date;
    updatedAt: Date;
}

const ProgressSchema: Schema = new Schema(
    {
        guideId: { type: Schema.Types.ObjectId, ref: 'StudyGuide', required: true, index: true },
        supabaseUserId: { type: String, required: true, index: true },
        lastReviewed: { type: Date, default: Date.now },
        masteryScore: { type: Number, default: 0, min: 0, max: 100 },
        nextReviewDate: { type: Date },
    },
    { timestamps: true }
);

const Progress: Model<IProgress> = mongoose.models.Progress || mongoose.model<IProgress>('Progress', ProgressSchema);

export default Progress;
