import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IStudyGuide extends Document {
    supabaseUserId: string;
    title: string;
    originalContent: string;
    generatedContent: any; // JSON structure from AI
    conceptMapData?: any; // JSON for React Flow
    difficultyLevel: 'easy' | 'medium' | 'hard';
    createdAt: Date;
    updatedAt: Date;
}

const StudyGuideSchema: Schema = new Schema(
    {
        supabaseUserId: { type: String, required: true, index: true },
        title: { type: String, required: true, default: 'Untitled Guide' },
        originalContent: { type: String, required: true },
        generatedContent: { type: Schema.Types.Mixed, required: true }, // Using Mixed for flexible JSON
        conceptMapData: { type: Schema.Types.Mixed },
        difficultyLevel: {
            type: String,
            enum: ['easy', 'medium', 'hard'],
            default: 'medium',
        },
    },
    { timestamps: true }
);

const StudyGuide: Model<IStudyGuide> = mongoose.models.StudyGuide || mongoose.model<IStudyGuide>('StudyGuide', StudyGuideSchema);

export default StudyGuide;
