import 'express-async-errors';
import dotenv from 'dotenv';
import express from 'express';
import db from './db/conn';
import Logger from './utils/logger';

import auth from './routes/authRoutes';
import path from 'path';
import { errorMiddleware } from './middlewares/error';
import morganMiddleware from './middlewares/morganMiddleware';

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(morganMiddleware);

app.use('/auth', auth);
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

app.use(errorMiddleware);

app.listen(port, async () => {
    await db();
    Logger.info(`Aplicação está funcionando na porta: ${port}`);
});
