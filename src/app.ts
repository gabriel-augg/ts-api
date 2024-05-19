import "express-async-errors"
import dotenv from "dotenv"
import express from "express"
import db from "./config/db"
import Logger from "./config/logger"

import auth from "./api/routes/authRoutes"
import path from "path"
import { errorMiddleware } from "./middlewares/error"


dotenv.config()

const port = process.env.PORT || 3000
const app = express()

app.use(express.json())

app.use("/auth", auth)

app.use("/images", express.static(path.join(__dirname, "..", "uploads")))

app.use(errorMiddleware)

app.listen(port, async () => {
    await db()
    Logger.info(`Aplicação está funcionando na porta: ${port}`)
})

