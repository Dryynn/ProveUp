import { Router } from 'express';
import { AuthController } from '../controllers/authController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

export const authRoutes = Router();

authRoutes.post('/register', AuthController.register);
authRoutes.post('/login', AuthController.login);
authRoutes.get('/me', authMiddleware, AuthController.me);
authRoutes.post('/recover-password', AuthController.recoverPassword);
authRoutes.post('/reset-password', AuthController.resetPassword);
