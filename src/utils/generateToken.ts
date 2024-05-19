import { sign } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.JWT_SECRET!;

export function generateToken(id: string, username: string, avatar_url: string | null){
    const token = sign(
        { username, avatar_url },
        secret,
        {
            subject: id,
            expiresIn: '20s',
        },
    );

    return token;
}