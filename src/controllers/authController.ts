import { Request, Response } from 'express';
import { User } from '../models/User';
import bcrypt from 'bcrypt';
import { BadRequestError } from '../utils/api-errors';
import { sign } from 'jsonwebtoken'

const { JWT_SECRET } = process.env;

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

    res.status(204).json({});
}

export async function signIn(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new BadRequestError('Campos obrigatórios não preenchidos!');
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new BadRequestError('Email ou senha incorretos!');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        throw new BadRequestError('Email ou senha incorretos!');
    }

    const token = sign(
        { username: user.username, avatar_url: user.avatar_url },
        JWT_SECRET!,
        {
            subject: user._id.toString(),
            expiresIn: '1d',
        },
    );

    res.status(200).json({ token });

}
