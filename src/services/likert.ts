// UI buttons go from strongest agreement (0) to strongest disagreement (4).
export function toCanonicalAnswers(answers: Record<string, number>): Record<string, number> {
  return Object.fromEntries(Object.entries(answers).map(([id, value]) => [id, 5 - value]));
}
