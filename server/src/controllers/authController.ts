import type { Request, Response } from 'express';
import { AuthService } from '../services/authService.js';
import type { AuthenticatedRequest } from '../middlewares/authMiddleware.js';

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ error: 'Nome, email e senha são obrigatórios.' });
      }

      if (password.length < 6) {
        return res.status(400).json({ error: 'A senha deve ter pelo menos 6 caracteres.' });
      }

      const result = await AuthService.register({ name, email, password });
      return res.status(201).json(result);
    } catch (err: any) {
      return res.status(400).json({ error: err.message || 'Erro ao realizar cadastro.' });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Informe e-mail e senha.' });
      }

      const result = await AuthService.login({ email, password });
      return res.status(200).json(result);
    } catch (err: any) {
      return res.status(401).json({ error: err.message || 'Erro ao autenticar.' });
    }
  }

  static async me(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.userId) {
        return res.status(401).json({ error: 'Não autorizado.' });
      }

      const profile = await AuthService.getProfile(req.userId);
      return res.status(200).json({ user: profile });
    } catch (err: any) {
      return res.status(404).json({ error: err.message || 'Usuário não encontrado.' });
    }
  }

  static async recoverPassword(req: Request, res: Response) {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ error: 'O e-mail é obrigatório.' });
      }

      const result = await AuthService.requestPasswordRecovery(email);
      return res.status(200).json(result);
    } catch (err: any) {
      return res.status(400).json({ error: err.message || 'Erro na recuperação de senha.' });
    }
  }

  static async resetPassword(req: Request, res: Response) {
    try {
      const { email, token, newPassword } = req.body;

      if (!email || !token || !newPassword) {
        return res.status(400).json({ error: 'Email, código e nova senha são obrigatórios.' });
      }

      if (newPassword.length < 6) {
        return res.status(400).json({ error: 'A nova senha deve ter no mínimo 6 caracteres.' });
      }

      const result = await AuthService.resetPassword(email, token, newPassword);
      return res.status(200).json(result);
    } catch (err: any) {
      return res.status(400).json({ error: err.message || 'Erro ao redefinir senha.' });
    }
  }
}
