import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const EMAIL_USER = process.env.EMAIL_USER || 'adryansilva3421@gmail.com';
const EMAIL_PASS = (process.env.EMAIL_PASS || '').replace(/\s+/g, '');

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

export async function sendRecoveryEmail(to: string, token: string) {
  if (!EMAIL_PASS) {
    console.warn(`[MAIL WARNING] EMAIL_PASS não configurada no .env! O e-mail não pôde ser disparado via SMTP real.`);
    console.log(`[DEV MODE] Código gerado para ${to}: ${token}`);
    return;
  }

  const mailOptions = {
    from: `"ProveUP" <${EMAIL_USER}>`,
    to,
    subject: 'Código de Recuperação de Senha - ProveUP',
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #161616; color: #ffffff; padding: 40px; border-radius: 16px; max-width: 500px; margin: auto; border: 1px solid #333;">
        <h2 style="color: #ee7a2f; margin-top: 0;">Recuperação de Senha - ProveUP</h2>
        <p style="font-size: 16px; line-height: 1.5; color: #e5e7eb;">
          Olá! Recebemos uma solicitação para redefinir a sua senha no <strong>ProveUP</strong>.
        </p>
        <p style="font-size: 16px; color: #e5e7eb;">Use o código de verificação abaixo para criar uma nova senha:</p>
        <div style="text-align: center; margin: 30px 0;">
          <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #ffffff; background: linear-gradient(135deg, #ee7a2f, #ea3323); padding: 14px 28px; border-radius: 12px; display: inline-block;">
            ${token}
          </span>
        </div>
        <p style="font-size: 14px; color: #9ca3af;">
          Este código expira em <strong>15 minutos</strong>. Se você não solicitou a troca de senha, por favor ignore este e-mail.
        </p>
        <hr style="border: none; border-top: 1px solid #333333; margin: 30px 0;" />
        <p style="font-size: 12px; color: #6b7280; text-align: center;">
          &copy; ${new Date().getFullYear()} ProveUP - Todos os direitos reservados.
        </p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
  console.log(`[MAIL SUCCESS] E-mail de recuperação enviado com sucesso para ${to}`);
}

export async function sendWelcomeEmail(to: string, name: string) {
  if (!EMAIL_PASS) {
    console.warn(`[MAIL WARNING] EMAIL_PASS não configurada no .env! E-mail de boas-vindas não enviado.`);
    return;
  }

  const mailOptions = {
    from: `"ProveUP" <${EMAIL_USER}>`,
    to,
    subject: 'Bem-vindo(a) ao ProveUP! 🚀',
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #161616; color: #ffffff; padding: 40px; border-radius: 16px; max-width: 500px; margin: auto; border: 1px solid #333;">
        <h2 style="color: #ee7a2f; margin-top: 0;">Bem-vindo(a) à sua nova jornada! 🚀</h2>
        <p style="font-size: 16px; line-height: 1.6; color: #e5e7eb;">
          Olá, <strong>${name}</strong>! Estamos muito felizes em ter você no <strong>ProveUP</strong>.
        </p>
        <p style="font-size: 15px; line-height: 1.6; color: #d1d5db;">
          Sua conta foi criada com sucesso! Agora você já pode responder ao questionário de interesses, descobrir sua trilha ideal e navegar pelo mapa de conhecimento para turbinar seus estudos em tecnologia.
        </p>
        <div style="text-align: center; margin: 35px 0;">
          <a href="http://localhost:5173/login" style="background: linear-gradient(135deg, #ee7a2f, #ea3323); color: #ffffff; text-decoration: none; font-size: 16px; font-weight: bold; padding: 14px 28px; border-radius: 12px; display: inline-block;">
            Acessar Minha Conta
          </a>
        </div>
        <hr style="border: none; border-top: 1px solid #333333; margin: 30px 0;" />
        <p style="font-size: 12px; color: #6b7280; text-align: center;">
          &copy; ${new Date().getFullYear()} ProveUP - Todos os direitos reservados.
        </p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
  console.log(`[MAIL SUCCESS] E-mail de boas-vindas enviado com sucesso para ${to}`);
}
