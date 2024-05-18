import dotenv from "dotenv"
import express from "express"
import config from "config"
import db from "../config/db"
import Logger from "../config/logger"

dotenv.config()

const port = config.get<number>("port")
const app = express()

app.use(express.json())

app.listen(port, async () => {
    await db()
    Logger.info(`Aplicação está funcionando na porta: ${port}`)
})

