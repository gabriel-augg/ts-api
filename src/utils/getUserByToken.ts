import { User } from "../models/User";
import { verify } from "jsonwebtoken";
import dotenv from "dotenv";
import { NotFoundError } from "./api-errors";

dotenv.config();

export const getUserByToken = async (token: string) => {
    const secret = process.env.JWT_SECRET ?? "";
    const { sub } = verify(token, secret) as { sub: string };

    const user = await User.findOne({ _id: sub });

    if (!user) {
        throw new NotFoundError("Usuário não encontrado!");
    }

    return user;
}