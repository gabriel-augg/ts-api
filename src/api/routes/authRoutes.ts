import { Router } from "express";
import multer from "multer";
import { signUp } from "../controllers/authController";
import uploadConfig from "../../config/multer";
import { ApiError } from "../../helpers/api-erros";

const upload = multer(uploadConfig);

const router = Router();

router.post("/signup", upload.single("image"), signUp);

export default router;