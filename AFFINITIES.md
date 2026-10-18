# Afinidades do ProveUP — modelo 1.0.0

As 20 perguntas e as duas matrizes aprovadas ficam em `server/src/services/affinityService.ts`.
A interface carrega o catálogo pela API, envia respostas de 1 a 5 e recebe o resultado calculado no servidor.
Cada etapa é normalizada separadamente por carreira: `100 * soma(peso * (resposta - 1)) / (4 * soma(pesos))`.
A afinidade é `0,4 * comportamento + 0,6 * interesse`. Os valores completos são salvos; arredondamento é apenas visual.

O ranking mostra uma recomendação principal. Em igualdade numérica (tolerância de 1e-9), prioriza interesse profissional, depois a soma das duas respostas específicas da carreira (Q11–12, Q13–14, Q15–16, Q17–18 ou Q19–20). Persistindo igualdade, usa a ordem Front-end, Back-end, UX/UI, Dados e QA. Essa última ordem é apenas uma convenção de apresentação, sem evidência de preferência adicional; os percentuais não são alterados e não há aviso de empate na interface.

`POST /api/assessments` recebe `{ version, answers }`, exige autenticação e salva respostas, ranking, recomendação e versão na tabela Assessment. `GET /api/assessments/:id` permite recuperar somente avaliações da própria conta. `GET /api/assessments/questionnaire` fornece perguntas e versão.
O resultado pode ser recarregado pelo endereço `/result/:assessmentId`.
Uma versão desatualizada retorna 409; respostas incompletas ou inválidas retornam 400.

As justificativas vêm de até três afirmações com concordância (4 ou 5), ordenadas pela contribuição para a carreira. Se não houver concordância, a página informa isso sem inventar pontos fortes.
Os percentuais são índices exploratórios de afinidade, não probabilidades de sucesso ou um instrumento psicométrico validado.

O mapa atual é somente de Front-end. A página não envia recomendações das outras carreiras para esse mapa.

## Desenvolvimento

Na primeira configuração, dentro de `server`, execute `npm run prisma:generate` e `npx prisma db push`. O schema adiciona Assessment com índice por usuário e data; não use opções de perda de dados. Em uma implantação com histórico de migrações, gere uma migração aditiva e faça o processo normal de revisão e deploy.

Testes: dentro de `server`, `node --import tsx --test tests/affinity.test.ts`.
Compilação: `npm run build` na raiz e em `server`.
