import { apiRequest } from './api';
import { toCanonicalAnswers } from './likert';

export type Career = 'frontend' | 'backend' | 'uxui' | 'dados' | 'qa';
export interface Questionnaire {
  version: string;
  questions: { id: string; text: string; stage: 'comportamento' | 'interesse' }[];
}
export interface CareerResult {
  career: Career;
  comportamento: number;
  interesse: number;
  afinidade: number;
  rank: number;
  reasons: { questionId: string; text: string }[];
}
export interface AssessmentResult {
  id: string;
  createdAt: string;
  version: string;
  ranking: CareerResult[];
  recommendedCareer: Career;
}
export const loadQuestionnaire = () => apiRequest<Questionnaire>('/assessments/questionnaire');
export const submitAssessment = (version: string, answers: Record<string, number>) =>
  apiRequest<AssessmentResult>('/assessments', { method: 'POST', data: { version, answers: toCanonicalAnswers(answers) } });
export const loadAssessment = (id: string) => apiRequest<AssessmentResult>(`/assessments/${encodeURIComponent(id)}`);
