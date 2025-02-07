import morgan, {StreamOptions} from "morgan";
import dotenv from "dotenv"

dotenv.config()

import Logger from "../utils/logger";

const stream: StreamOptions = {
    write: (message) => Logger.http(message)
};

const skip = () => {
    const env = process.env.ENV || "development"
    return env !== "development"
}

const loggerMiddleware = morgan(
    ":method :url :status :res[content-length] - :response-time ms", 
    {stream, skip}
)

export default loggerMiddleware;