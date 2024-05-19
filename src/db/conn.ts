import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Logger from '../utils/logger';

dotenv.config();

async function connect() {
    const dbUri =
        process.env.MONGO_URI || 'mongodb://localhost:27017/express-typescript';

    try {
        await mongoose.connect(dbUri);
        Logger.info('Conectou ao banco de dados!');
    } catch (error) {
        Logger.error('Não foi possível conectar!');
        Logger.error(`Error: ${error}`);
        process.exit(1);
    }
}

export default connect;
