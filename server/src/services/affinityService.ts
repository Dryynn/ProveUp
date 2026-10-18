export const MATRIX_VERSION = '1.0.0';
export const CAREERS = ['frontend', 'backend', 'uxui', 'dados', 'qa'] as const;
export type Career = typeof CAREERS[number];
type Stage = 'comportamento' | 'interesse';
type Weights = Record<Career, number>;
export type Question = { id: string; text: string; stage: Stage; weights: Weights };

// Question wording and both matrices are the approved MVP model. Bump the version when changing them.
const definitions: [string, string, number, number, number, number, number][] = [
  ['q1', 'Gosto de entender como as coisas funcionam e descobrir o que acontece por trás de um sistema ou processo.', 2, 3, 1, 2, 2],
  ['q2', 'Sinto satisfação ao resolver problemas que exigem raciocínio lógico e análise de diferentes possibilidades.', 2, 3, 1, 3, 3],
  ['q3', 'Gosto de encontrar soluções criativas e experimentar diferentes maneiras de realizar uma tarefa.', 3, 1, 3, 1, 1],
  ['q4', 'Prefiro trabalhar com atividades que possuem etapas, critérios e objetivos bem definidos.', 1, 2, 2, 2, 3],
  ['q5', 'Tenho interesse em investigar informações para compreender por que determinado problema aconteceu.', 1, 3, 2, 3, 3],
  ['q6', 'Gosto de conversar com outras pessoas para compreender suas dificuldades e necessidades.', 2, 1, 3, 2, 2],
  ['q7', 'Sinto satisfação ao transformar uma ideia em algo visual ou que outras pessoas possam utilizar.', 3, 0, 3, 1, 0],
  ['q8', 'Gosto de analisar informações detalhadas e identificar padrões ou relações entre elas.', 2, 3, 1, 3, 2],
  ['q9', 'Costumo prestar atenção em pequenos detalhes e identificar inconsistências que outras pessoas podem não perceber.', 2, 2, 2, 2, 3],
  ['q10', 'Gosto de dividir problemas complexos em partes menores para encontrar uma solução.', 2, 3, 2, 3, 3],
  ['q11', 'Gostaria de desenvolver a parte visual e interativa de sites ou aplicativos.', 3, 0, 2, 0, 0],
  ['q12', 'Tenho interesse em transformar layouts e ideias visuais em interfaces funcionais por meio de programação.', 3, 1, 1, 0, 0],
  ['q13', 'Gostaria de desenvolver as funcionalidades internas de um sistema, mesmo que elas não sejam visíveis para o usuário.', 0, 3, 0, 1, 1],
  ['q14', 'Tenho interesse em entender como sistemas armazenam, processam e trocam informações.', 0, 3, 0, 2, 1],
  ['q15', 'Gostaria de pesquisar como as pessoas utilizam aplicativos para identificar dificuldades e oportunidades de melhoria.', 1, 0, 3, 1, 1],
  ['q16', 'Tenho interesse em organizar informações e criar protótipos que tornem um aplicativo mais fácil de utilizar.', 2, 0, 3, 0, 0],
  ['q17', 'Gostaria de analisar conjuntos de dados para descobrir tendências e padrões.', 0, 1, 0, 3, 1],
  ['q18', 'Tenho interesse em utilizar gráficos, indicadores e informações para ajudar na tomada de decisões.', 1, 0, 1, 3, 0],
  ['q19', 'Gostaria de testar diferentes situações em um sistema para descobrir possíveis erros.', 1, 1, 0, 0, 3],
  ['q20', 'Tenho interesse em investigar a causa de falhas e verificar se uma correção realmente resolveu o problema.', 1, 2, 0, 1, 3],
];

export const QUESTIONS: Question[] = definitions.map(([id, text, frontend, backend, uxui, dados, qa], index) => ({
  id, text, stage: index < 10 ? 'comportamento' : 'interesse',
  weights: { frontend, backend, uxui, dados, qa },
}));

export class InvalidAssessmentError extends Error {}

export function validateAnswers(input: unknown): Record<string, number> {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    throw new InvalidAssessmentError('Envie as 20 respostas, com valores inteiros de 1 a 5.');
  }
  const answers = input as Record<string, unknown>;
  const ids = new Set(QUESTIONS.map(q => q.id));
  if (Object.keys(answers).length !== ids.size || Object.keys(answers).some(id => !ids.has(id)) ||
    QUESTIONS.some(q => !Object.hasOwn(answers, q.id) || !Number.isInteger(answers[q.id]) ||
      (answers[q.id] as number) < 1 || (answers[q.id] as number) > 5)) {
    throw new InvalidAssessmentError('Respostas inválidas ou incompletas. Responda às 20 perguntas de 1 a 5.');
  }
  return answers as Record<string, number>;
}

export function calculateAffinities(input: unknown) {
  const answers = validateAnswers(input);
  const results = CAREERS.map(career => {
    const stageScore = (stage: Stage) => {
      const selected = QUESTIONS.filter(q => q.stage === stage);
      const total = selected.reduce((sum, q) => sum + q.weights[career], 0);
      return selected.reduce((sum, q) => sum + (answers[q.id] - 1) * q.weights[career], 0) / (4 * total) * 100;
    };
    const comportamento = stageScore('comportamento');
    const interesse = stageScore('interesse');
    const reasons = QUESTIONS.filter(q => answers[q.id] >= 4 && q.weights[career] > 0)
      .map(q => {
        const total = QUESTIONS.filter(other => other.stage === q.stage).reduce((sum, other) => sum + other.weights[career], 0);
        return { questionId: q.id, text: q.text, contribution: (q.stage === 'comportamento' ? 0.4 : 0.6) * (answers[q.id] - 1) * q.weights[career] / (4 * total) };
      }).sort((a, b) => b.contribution - a.contribution).slice(0, 3)
      .map(({ questionId, text }) => ({ questionId, text }));
    return { career, comportamento, interesse, afinidade: comportamento * 0.4 + interesse * 0.6, reasons };
  });
  const directInterest = (career: Career) => {
    const start = 11 + CAREERS.indexOf(career) * 2;
    return answers[`q${start}`] + answers[`q${start + 1}`];
  };
  const compare = (a: number, b: number) => Math.abs(a - b) <= 1e-9 ? 0 : b - a;
  results.sort((a, b) => compare(a.afinidade, b.afinidade) || compare(a.interesse, b.interesse) ||
    compare(directInterest(a.career), directInterest(b.career)) || CAREERS.indexOf(a.career) - CAREERS.indexOf(b.career));
  const ranking = results.map((result, index) => ({ ...result, rank: index + 1 }));
  return { version: MATRIX_VERSION, ranking, recommendedCareer: ranking[0].career };
}
