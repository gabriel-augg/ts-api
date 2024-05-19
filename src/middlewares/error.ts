import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../helpers/api-erros';

export const errorMiddleware = (
    err: Error & Partial<ApiError>,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const statusCode = err.statusCode ?? 500;
    const message = err.message ? err.message : "Erro interno do servidor" ;
    res.status(statusCode).json({ message });
};
