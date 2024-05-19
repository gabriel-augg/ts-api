import { model, Schema } from "mongoose";

const refreshTokenSchema = new Schema(
    {
        user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        expires_at: { type: Number, required: true },
    },
);

export const RefreshToken = model('RefreshToken', refreshTokenSchema);