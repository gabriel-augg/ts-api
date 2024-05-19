import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../helpers/api-erros';

export const errorMiddleware = (
    err: Error & Partial<ApiError>,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const statusCode = err.statusCode ?? 500;
    res.status(statusCode).json("caiu no error middleware");
};
