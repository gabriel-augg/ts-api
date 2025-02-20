import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { UnauthorizedError } from "../utils/api-errors";
import dotenv from "dotenv";

dotenv.config();

const secret: string = process.env.JWT_SECRET ?? "";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authToken = req.headers.authorization; 

  if (!authToken) {
    throw new UnauthorizedError("Token não informado!");
  }

  const [, token] = authToken.split(" ");

  try {
    verify(token, secret);
    req.body.token = token;
    next();
  } catch (error) {
    throw new UnauthorizedError("Token inválido!");
  }
};