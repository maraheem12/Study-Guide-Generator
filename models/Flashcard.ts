import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IFlashcard extends Document {
    guideId: mongoose.Types.ObjectId;
    question: string;
    answer: string;
    type?: string;
    createdAt: Date;
    updatedAt: Date;
}

const FlashcardSchema: Schema = new Schema(
    {
        guideId: { type: Schema.Types.ObjectId, ref: 'StudyGuide', required: true, index: true },
        question: { type: String, required: true },
        answer: { type: String, required: true },
        type: { type: String, default: 'standard' },
    },
    { timestamps: true }
);

const Flashcard: Model<IFlashcard> = mongoose.models.Flashcard || mongoose.model<IFlashcard>('Flashcard', FlashcardSchema);

export default Flashcard;
