import multer, { Options } from "multer"
import path from "path"

export default {
    storage: multer.diskStorage({
        destination: path.join(__dirname, "..", "..", "uploads"),
        filename: (req, file, cb) => {
            const fileName = `${Date.now()}-${file.originalname}`
            cb(null, fileName)
        }
    }),

    limits: {
        fileSize: 8 * 1024 * 1024
    },

    fileFilter: (req, file, cb) => {
        const mimeType = ["image/jpeg", "image/png", "image/jpg"];

        if(!mimeType.includes(file.mimetype)) {
            return cb(null, false)
        }

        cb(null, true)
    }
} as Options;