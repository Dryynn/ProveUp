import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma.js';
import { sendRecoveryEmail, sendWelcomeEmail } from './emailService.js';

const JWT_SECRET = process.env.JWT_SECRET || 'proveup_default_secret';

export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export class AuthService {
  static async register({ name, email, password }: RegisterDTO) {
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (existingUser) {
      throw new Error('E-mail já cadastrado no sistema.');
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        passwordHash,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    // Envia e-mail de boas-vindas assincronamente
    try {
      await sendWelcomeEmail(user.email, user.name);
    } catch (mailErr) {
      console.error('[AUTH ERROR] Erro ao enviar e-mail de boas-vindas:', mailErr);
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

    return { user, token };
  }

  static async login({ email, password }: LoginDTO) {
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (!user) {
      throw new Error('Credenciais inválidas. Verifique seu e-mail e senha.');
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      throw new Error('Credenciais inválidas. Verifique seu e-mail e senha.');
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
      token,
    };
  }

  static async getProfile(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    return user;
  }

  static async requestPasswordRecovery(email: string) {
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (!user) {
      // Por segurança não revelamos se o e-mail existe ou não
      return { message: 'Se o e-mail estiver cadastrado, as instruções foram enviadas.' };
    }

    // Gera um código numérico de 6 dígitos ou token
    const token = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutos de validade

    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken: token,
        resetTokenExpires: expires,
      },
    });

    // Envia o e-mail via Nodemailer/Gmail
    try {
      await sendRecoveryEmail(user.email, token);
    } catch (mailErr) {
      console.error('[AUTH ERROR] Erro ao enviar e-mail via SMTP:', mailErr);
    }

    return {
      message: 'Se o e-mail estiver cadastrado, o código foi enviado para sua caixa de entrada.',
      devToken: token
    };
  }

  static async resetPassword(email: string, token: string, newPassword: string) {
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (!user || !user.resetToken || !user.resetTokenExpires) {
      throw new Error('Solicitação de recuperação inválida ou expirada.');
    }

    if (user.resetToken !== token.trim()) {
      throw new Error('Código de recuperação inválido.');
    }

    if (new Date() > user.resetTokenExpires) {
      throw new Error('Código de recuperação expirado. Solicite um novo código.');
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(newPassword, salt);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash,
        resetToken: null,
        resetTokenExpires: null,
      },
    });

    return { message: 'Senha atualizada com sucesso!' };
  }
}
