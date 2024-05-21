import { Request, Response } from 'express';
import { BadRequestError, NotFoundError } from '../utils/api-errors';
import { getUserByToken } from '../utils/getUserByToken';

export async function updateUser(req: Request, res: Response) {
    const { name, username, location, email, token } = req.body;

    const requestImage = req.file as Express.Multer.File;
    const avatar_url = requestImage ? requestImage.filename : null;

    if(!name || !username || !email) {
        throw new BadRequestError('Preencha todos os campos!');
    }

    const user = await getUserByToken(token);


    if (!user) {
        throw new NotFoundError('Usuário não encontrado!');
    }

    user.name = name;
    user.username = username;
    user.location = location;
    user.email = email;
    user.avatar_url = avatar_url;
    user.save();
    res.status(204).json({});

}
