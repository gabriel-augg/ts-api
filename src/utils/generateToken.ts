import { sign } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.JWT_SECRET ?? '';

export const generateToken = (id: string) => {
    const token = sign({}, secret, {
        subject: id,
        expiresIn: '20s',
    });

    return token;
};
