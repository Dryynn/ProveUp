import assert from 'node:assert/strict';
import test from 'node:test';
import { CAREERS, QUESTIONS, calculateAffinities, InvalidAssessmentError } from '../src/services/affinityService.ts';
import { toCanonicalAnswers } from '../../src/services/likert.ts';

const uniform = (value: number) => Object.fromEntries(QUESTIONS.map(q => [q.id, value]));

for (const [answer, expected] of [[1, 0], [3, 50], [5, 100]]) {
  test(`todas as respostas ${answer}: ${expected}% nas cinco carreiras`, () => {
    const result = calculateAffinities(uniform(answer));
    assert.equal(result.ranking.length, 5);
    for (const row of result.ranking) {
      assert.equal(row.comportamento, expected);
      assert.equal(row.interesse, expected);
      assert.equal(row.afinidade, expected);
    }
    assert.equal(result.recommendedCareer, 'frontend');
    assert.deepEqual(result.ranking.map(r => r.rank), [1, 2, 3, 4, 5]);
  });
}

test('preserva os totais das matrizes aprovadas', () => {
  for (const [stage, expected] of [['comportamento', [20, 21, 20, 22, 22]], ['interesse', [12, 11, 10, 11, 10]]] as const) {
    assert.deepEqual(CAREERS.map(c => QUESTIONS.filter(q => q.stage === stage).reduce((sum, q) => sum + q.weights[c], 0)), expected);
  }
});

for (const [index, career] of CAREERS.entries()) {
  test(`interesse específico em ${career} gera recomendação correspondente`, () => {
    const answers = uniform(1);
    for (let i = 1; i <= 10; i++) answers[`q${i}`] = 3;
    answers[`q${11 + index * 2}`] = 5;
    answers[`q${12 + index * 2}`] = 5;
    const result = calculateAffinities(answers);
    assert.equal(result.recommendedCareer, career);
    assert(result.ranking[0].reasons.length > 0);
    for (const row of result.ranking) {
      assert.equal(row.comportamento, 50);
      assert(row.afinidade >= 0 && row.afinidade <= 100);
    }
  });
}

test('exemplo calculado à mão usa relações secundárias e proporção 40/60', () => {
  const answers = uniform(1);
  for (let i = 1; i <= 10; i++) answers[`q${i}`] = 3;
  answers.q11 = 5;
  answers.q12 = 5;
  const result = calculateAffinities(answers);
  const frontend = result.ranking.find(r => r.career === 'frontend')!;
  const uxui = result.ranking.find(r => r.career === 'uxui')!;
  assert.equal(frontend.interesse, 50); // 6 of 12 interest weights.
  assert.equal(frontend.afinidade, 50);
  assert.equal(uxui.interesse, 30); // 3 of 10 interest weights.
  assert.equal(uxui.afinidade, 38);
});

test('rejeita respostas incompletas, extras, fracionárias e fora da escala', () => {
  const missing = uniform(3); delete missing.q20;
  for (const input of [undefined, null, [], '3', missing, { ...uniform(3), q21: 3 },
    ...[0, 6, 2.5, NaN, Infinity, '5', null, undefined].map(q1 => ({ ...uniform(3), q1 }))]) {
    assert.throws(() => calculateAffinities(input), InvalidAssessmentError);
  }
});

test('não cria justificativas positivas quando há apenas neutralidade ou discordância', () => {
  assert(calculateAffinities(uniform(3)).ranking.every(r => r.reasons.length === 0));
  assert(calculateAffinities(uniform(1)).ranking.every(r => r.reasons.length === 0));
});

test('converte os cinco botões da interface para a escala canônica', () => {
  assert.deepEqual(toCanonicalAnswers({ q1: 0, q2: 1, q3: 2, q4: 3, q5: 4 }),
    { q1: 5, q2: 4, q3: 3, q4: 2, q5: 1 });
});
