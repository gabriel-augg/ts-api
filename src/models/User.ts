import { model, Schema } from 'mongoose';

const userSchema = new Schema(
    {
        name: { type: String, required: true },
        username: { type: String, required: true, unique: true},
        avatar_url: { type: String },
        location: { type: String },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        refreshToken: { type: Schema.Types.ObjectId, ref: 'RefreshToken' },
    },
    { timestamps: true },
);

export const User = model('User', userSchema);