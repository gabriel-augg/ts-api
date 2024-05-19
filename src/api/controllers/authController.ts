import { Request, Response } from 'express';
import { User } from '../models/User';
import bcrypt from 'bcrypt';
import { BadRequestError } from '../../helpers/api-erros';

export async function signUp(req: Request, res: Response) {
    const { name, username, location, email, password, confirmPassword } =
        req.body;
    const requestImage = req.file as Express.Multer.File;

    if (!name || !username || !email || !password || !confirmPassword) {
        throw new BadRequestError('Campos obrigatórios não preenchidos!');
    }

    const usernameIsTaken = await User.findOne({ username });

    if (usernameIsTaken) {
        throw new BadRequestError('Nome de usuário já em uso!');
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        throw new BadRequestError('Email já cadastrado!');
    }

    if (password !== confirmPassword) {
        throw new BadRequestError('Senhas não conferem!');
    }

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
