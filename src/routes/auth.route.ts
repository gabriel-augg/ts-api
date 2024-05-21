import { Router } from 'express';
import multer from 'multer';
import { signIn, signUp, refreshToken } from '../controllers/auth.controller';
import uploadConfig from '../utils/upload';

const upload = multer(uploadConfig);

const router = Router();

router.post('/signup', upload.single('image'), signUp);
router.post('/signin', signIn);
router.post("/refreshtoken", refreshToken);

export default router;
