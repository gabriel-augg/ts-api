import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/api-errors';
import Logger from '../utils/logger';

export const errorMiddleware = (
    err: Error & Partial<ApiError>,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const statusCode = err.statusCode ?? 500;
    const message = err.message ? err.message : 'Erro interno do servidor';
    Logger.error(`Http: ${[statusCode]} ${message}`);
    res.status(statusCode).json({ message });
};
