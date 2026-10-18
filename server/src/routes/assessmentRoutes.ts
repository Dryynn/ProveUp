import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import type { AuthenticatedRequest } from '../middlewares/authMiddleware.js';
import { calculateAffinities, InvalidAssessmentError, MATRIX_VERSION, QUESTIONS } from '../services/affinityService.js';

export const assessmentRoutes = Router();

assessmentRoutes.get('/questionnaire', (_req, res) => {
  res.json({ version: MATRIX_VERSION, questions: QUESTIONS.map(({ id, text, stage }) => ({ id, text, stage })) });
});

assessmentRoutes.use(authMiddleware);

assessmentRoutes.post('/', async (req: AuthenticatedRequest, res) => {
  try {
    if (req.body?.version !== MATRIX_VERSION) {
      return res.status(409).json({ error: 'O questionário foi atualizado. Recarregue a página e responda novamente.' });
    }
    const result = calculateAffinities(req.body?.answers);
    // Ownership comes from the verified token, never from request body parameters.
    const assessment = await prisma.assessment.create({ data: {
      userId: req.userId!, version: MATRIX_VERSION,
      answers: JSON.stringify(req.body.answers), result: JSON.stringify(result),
    } });
    return res.status(201).json({ id: assessment.id, createdAt: assessment.createdAt, ...result });
  } catch (error) {
    if (error instanceof InvalidAssessmentError) return res.status(400).json({ error: error.message });
    console.error('[ASSESSMENT] Não foi possível salvar a avaliação.', error);
    return res.status(500).json({ error: 'Não foi possível salvar seu resultado. Tente novamente.' });
  }
});

assessmentRoutes.get('/:id', async (req: AuthenticatedRequest, res) => {
  try {
    const assessment = await prisma.assessment.findFirst({ where: { id: String(req.params.id), userId: req.userId! } });
    if (!assessment) return res.status(404).json({ error: 'Resultado não encontrado para sua conta.' });
    return res.json({ id: assessment.id, createdAt: assessment.createdAt, ...JSON.parse(assessment.result) });
  } catch (error) {
    console.error('[ASSESSMENT] Não foi possível carregar a avaliação.', error);
    return res.status(500).json({ error: 'Não foi possível carregar seu resultado. Tente novamente.' });
  }
});
