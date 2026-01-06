import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
    supabaseUserId: string;
    email: string;
    preferences?: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema = new Schema(
    {
        supabaseUserId: { type: String, required: true, unique: true, index: true },
        email: { type: String, required: true },
        preferences: { type: Map, of: String }, // Flexible preferences
    },
    { timestamps: true }
);

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
