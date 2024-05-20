import { Request, Response } from 'express';
import { User } from '../models/User';
import { UnauthorizedError } from '../utils/api-errors';

export async function updateUser(req: Request, res: Response) {
    // const { name, username, location, email } = req.body;
    // const { user_id } = req.params;
    // const requestImage = req.file as Express.Multer.File;
    // const avatar_url = requestImage ? requestImage.filename : null;
    // const user = await User.findOne({ _id: user_id });

    // if (!user) {
    //     throw new UnauthorizedError('Usuário não encontrado!');
    // }
    // user.name = name;
    // user.username = username;
    // user.location = location;
    // user.email = email;
    // user.avatar_url = avatar_url;
    // user.save();
    // res.status(204).json({});

    res.status(204).json({});
}
