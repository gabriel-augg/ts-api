import { Request, Response } from 'express';
import { User } from '../models/User';
import bcrypt from 'bcrypt';

export async function signUp(req: Request, res: Response) {
    const { name, username, location, email, password } = req.body;
    const requestImage = req.file as Express.Multer.File;

    const gentSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, gentSalt);

    const user = new User({
        name,
        username,
        location,
        email,
        avatar_url: requestImage?.filename || '',
        password: hashedPassword,
    });

    await user.save();

    res.status(201).json(user);
}
