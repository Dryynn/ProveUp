import type { Career } from '../services/assessments';

interface CareerPresentation {
  activities: string[];
  challenge: { title: string; duration: string; description: string; steps: string[]; reflection: string };
}

export const careerPresentation: Record<Career, CareerPresentation> = {
  frontend: {
    activities: ['Transformar um layout em uma página que funciona no celular e no computador.', 'Conectar botões e formulários às informações de um sistema.', 'Melhorar a acessibilidade e a navegação de uma interface.'],
    challenge: {
      title: 'Desenhe sua primeira página pessoal', duration: '20–30 min',
      description: 'Você pode começar no papel, sem instalar ferramentas ou saber programar.',
      steps: ['Escolha três informações que gostaria de apresentar sobre você.', 'Desenhe a página no celular e no computador, com um título e um botão.', 'Explique o que acontece ao clicar no botão e como você organizaria isso em uma página web.'],
      reflection: 'Você gostou de imaginar a interface funcionando? Esse é um bom motivo para experimentar HTML e CSS como próximo passo.',
    },
  },
  backend: {
    activities: ['Definir o que acontece quando alguém faz um pedido ou um cadastro.', 'Criar serviços que recebem, validam e devolvem informações.', 'Organizar regras de acesso e a comunicação com o banco de dados.'],
    challenge: {
      title: 'Planeje o funcionamento de um pedido', duration: '20–30 min',
      description: 'Imagine um aplicativo de pedidos e descreva suas regras em uma folha ou editor de texto.',
      steps: ['Liste quais informações são necessárias para criar um pedido.', 'Descreva as verificações: produto disponível, quantidade válida e endereço informado.', 'Escreva qual resposta o sistema deve devolver em caso de sucesso e de erro.'],
      reflection: 'Você gostou de pensar nas regras por trás da tela? Experimente representar esse fluxo com lógica de programação.',
    },
  },
  uxui: {
    activities: ['Conversar com usuários para entender dificuldades e necessidades.', 'Organizar telas e criar protótipos de uma experiência.', 'Observar pessoas usando um produto e propor melhorias.'],
    challenge: {
      title: 'Melhore uma tela que você usa', duration: '20–30 min',
      description: 'Escolha uma tela de um aplicativo conhecido. Papel e lápis são suficientes.',
      steps: ['Escolha uma tarefa, como encontrar uma informação, e anote uma dificuldade da tela.', 'Desenhe uma alternativa que facilite essa tarefa.', 'Peça a alguém para explicar como usaria seu desenho e anote o que você mudaria.'],
      reflection: 'Você gostou de entender a dificuldade e ajustar a solução? Explore pesquisa com usuários e prototipação.',
    },
  },
  dados: {
    activities: ['Preparar e organizar informações antes de analisá-las.', 'Investigar padrões e responder perguntas com dados.', 'Criar gráficos e indicadores para comunicar descobertas.'],
    challenge: {
      title: 'Descubra um padrão na sua rotina', duration: '20–30 min',
      description: 'Use dados fictícios de horas de estudo de uma semana, no papel ou em uma planilha.',
      steps: ['Monte uma tabela com os sete dias e as horas estudadas em cada um.', 'Calcule o total, a média e o dia com mais horas de estudo.', 'Desenhe um gráfico e escreva uma conclusão e uma pergunta que os dados ainda não respondem.'],
      reflection: 'Você gostou de transformar números em uma descoberta? Explore planilhas, gráficos e consultas com SQL.',
    },
  },
  qa: {
    activities: ['Planejar situações para verificar se um sistema funciona como esperado.', 'Explorar caminhos inesperados e registrar falhas com clareza.', 'Verificar correções e evitar que problemas reapareçam.'],
    challenge: {
      title: 'Pense como alguém que testa sistemas', duration: '20–30 min',
      description: 'Imagine um formulário de cadastro, sem enviar informações ou criar uma conta.',
      steps: ['Liste cinco situações: campos vazios, e-mail inválido, senha curta e duas situações à sua escolha.', 'Para cada situação, escreva o comportamento esperado.', 'Descreva uma falha fictícia com passos para reproduzir, resultado esperado e resultado observado.'],
      reflection: 'Você gostou de investigar caminhos e explicar falhas? Experimente criar casos de teste e fazer testes exploratórios.',
    },
  },
};

// Only themes supported by positively answered questions returned by the backend are used.
export const reasonThemes: Record<string, string> = {
  q1: 'entender como os sistemas funcionam', q2: 'resolver desafios lógicos',
  q3: 'experimentar soluções criativas', q4: 'trabalhar com etapas e objetivos definidos',
  q5: 'investigar as causas de problemas', q6: 'compreender as necessidades das pessoas',
  q7: 'transformar ideias em algo visual ou utilizável', q8: 'analisar informações e identificar padrões',
  q9: 'observar detalhes e inconsistências', q10: 'dividir problemas complexos em partes menores',
  q11: 'criar interfaces visuais e interativas', q12: 'transformar layouts em interfaces com programação',
  q13: 'construir as funcionalidades internas de sistemas', q14: 'entender o armazenamento e a troca de informações',
  q15: 'pesquisar dificuldades de quem usa aplicativos', q16: 'organizar interfaces e criar protótipos',
  q17: 'descobrir tendências em conjuntos de dados', q18: 'usar gráficos e indicadores para apoiar decisões',
  q19: 'testar situações para encontrar erros', q20: 'investigar falhas e verificar correções',
};

export function explainReasons(reasons: { questionId: string }[]): string | null {
  const themes = [...new Set(reasons.map(reason => reasonThemes[reason.questionId]).filter(Boolean))].slice(0, 3);
  if (!themes.length) return null;
  const joined = themes.length === 1 ? themes[0] : `${themes.slice(0, -1).join(', ')} e ${themes.at(-1)}`;
  return `Nas suas respostas, você demonstrou interesse em ${joined}. Essas preferências contribuíram para a afinidade com esta carreira.`;
}
