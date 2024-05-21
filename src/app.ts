import 'express-async-errors';
import dotenv from 'dotenv';
import express from 'express';
import db from './db/conn';
import Logger from './utils/logger';

import authRoutes from './routes/auth.route';
import userRoutes from './routes/user.route';
import path from 'path';
import { errorMiddleware } from './middlewares/errorMiddleware';
import loggerMiddleware from './middlewares/loggerMiddleware';

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(loggerMiddleware);

app.use('/auth', authRoutes);
app.use('/users', userRoutes)
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

app.use(errorMiddleware);

app.listen(port, async () => {
    await db();
    Logger.info(`Aplicação está funcionando na porta: ${port}`);
});

export { app }
