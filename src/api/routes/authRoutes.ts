import { Router } from "express";
import { signUp } from "../controllers/authController";
import { signUpValidation } from "../../middleware/userValidation";
import { handleValidate } from "./handleValidate";

const router = Router();

router.post("/signup", signUpValidation(), handleValidate, signUp);

export default router;