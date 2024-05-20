import { Request, Response } from 'express';
import { User } from '../models/User';
import { RefreshToken } from '../models/RefreshToken';
import bcrypt from 'bcrypt';
import { BadRequestError, UnauthorizedError } from '../utils/api-errors';
import { generateRefreshToken } from '../utils/generateRefreshToken';
import { generateToken } from '../utils/generateToken';
import dayjs from 'dayjs';


export async function signUp(req: Request, res: Response) {
    const { name, username, location, email, password, confirmPassword } =
        req.body;
    const requestImage = req.file as Express.Multer.File;
    const avatar_url = requestImage ? requestImage.filename : null;

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
        avatar_url,
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

    await RefreshToken.deleteMany({ user_id: user._id });

    const token = generateToken(user._id.toString())

    const refreshToken = await generateRefreshToken(user._id.toString());

    res.status(200).json({ token, refreshToken });

}

export async function refreshToken(req: Request, res: Response) {
    const { refresh_token } = req.body;

    const refreshToken = await RefreshToken.findOne({ _id: refresh_token });

    if (!refreshToken) {
        throw new UnauthorizedError('Token de atualização inválido!');
    }

    const token = generateToken(refreshToken.user_id.toString());

    const refreshTokenExpired = dayjs().isAfter(dayjs.unix(refreshToken.expires_at));

    if (refreshTokenExpired) {
        await RefreshToken.deleteMany({ user_id: refreshToken.user_id });

        const newRefreshToken = await generateRefreshToken(refreshToken.user_id.toString());

        res.status(200).json({ token, refreshToken: newRefreshToken});
    }


    res.status(200).json({ token });
}
