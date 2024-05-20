import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { updateUser } from "../controllers/userController";

const router = Router();

router.put("/update", authMiddleware, updateUser);

export default router;