import type { Career } from '../services/assessments';

export const careers: Record<Career, { title: string; description: string; skills: string[]; areas: string[] }> = {
  frontend: {
    title: 'Desenvolvimento Front-end',
    description: 'Criação de interfaces web interativas, transformando layouts em código e cuidando da experiência de quem utiliza o sistema.',
    skills: ['HTML, CSS e JavaScript', 'Interfaces responsivas e acessíveis', 'Componentes e frameworks web', 'Integração com APIs'],
    areas: ['Web', 'Interfaces', 'Programação', 'Acessibilidade'],
  },
  backend: {
    title: 'Desenvolvimento Back-end',
    description: 'Construção das funcionalidades internas de sistemas, das regras de negócio e dos serviços que armazenam, processam e trocam informações.',
    skills: ['Lógica e regras de negócio', 'Desenvolvimento de APIs', 'Persistência de dados', 'Autenticação e testes de serviços'],
    areas: ['APIs', 'Serviços', 'Programação', 'Banco de Dados'],
  },
  uxui: {
    title: 'UX/UI Design',
    description: 'Pesquisa de necessidades dos usuários e criação de interfaces e protótipos que tornem produtos digitais mais fáceis de utilizar.',
    skills: ['Pesquisa com usuários', 'Arquitetura da informação', 'Prototipação e design de interfaces', 'Testes de usabilidade'],
    areas: ['Pesquisa', 'Usabilidade', 'Interfaces', 'Prototipação'],
  },
  dados: {
    title: 'Análise de Dados',
    description: 'Exploração de conjuntos de dados para identificar padrões, construir indicadores e apoiar decisões com informações.',
    skills: ['Preparação e consulta de dados', 'Estatística descritiva', 'Gráficos e painéis', 'Comunicação de resultados'],
    areas: ['Dados', 'SQL', 'Indicadores', 'Visualização'],
  },
  qa: {
    title: 'Qualidade de Software (QA)',
    description: 'Planejamento e execução de testes, investigação de falhas e verificação de correções para melhorar a qualidade de sistemas.',
    skills: ['Cenários e casos de teste', 'Testes exploratórios', 'Registro e investigação de falhas', 'Automação de testes'],
    areas: ['Testes', 'Qualidade', 'Investigação', 'Automação'],
  },
};
