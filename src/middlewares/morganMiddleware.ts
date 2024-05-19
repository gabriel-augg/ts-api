import morgan, {StreamOptions} from "morgan";
import dotenv from "dotenv"

dotenv.config()

import Logger from "../config/logger";

const stream: StreamOptions = {
    write: (message) => Logger.http(message)
};

const skip = () => {
    const env = process.env.ENV || "development"
    return env !== "development"
}

const morganMiddleware = morgan(
    ":method :url :status :res[content-length] - :response-time ms", 
    {stream, skip}
)

export default morganMiddleware;