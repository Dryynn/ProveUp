<<<<<<< HEAD
# ProveUP - Mapeamento de Carreiras & Evolução Profissional

O **ProveUP** é uma aplicação focada em mapear os perfis dos usuários através de avaliações comportamentais e lógicas (formulários baseados na Escala Likert), recomendando trilhas de aprendizado e caminhos profissionais com base nesse *assessment*. 

## 🚀 Status e Funcionalidades

Atualmente, o Front-End da plataforma possui as seguintes funcionalidades finalizadas:
- [x] **Gestão de Conta:** Rotas completas para o usuário fazer Cadastro, Login ou pedir a Recuperação da Senha. As telas contam com validações visuais modernas, mensagens interativas de *Toast* bloqueando e-mails mal formados ou não aceite de termos.
- [x] **Questionário Perfil:** Fluxo de avaliação contínuo (`Stepper`), medindo a competência e o interesse com componentes que reagem nativamente.
- [x] **Resultados de Afinidade:** Ao fim do questionário, o sistema ranqueia o nível de afinidade e joga num dashboard que lista o porquê de cada indicação e o que a pessoa precisa melhorar.
- [x] **Landing Page:** Vitrine descritiva com o layout principal.

## 🛠️ Tecnologias Utilizadas

Este projeto adota uma fundação rígida priorizando *Developer Experience* e componentização em blocos atômicos.

- **React 19:** Biblioteca base em arquitetura de funções/hooks.
- **Vite:** Ferramenta responsável pelo *bundling* ultra-veloz.
- **TypeScript:** Segurança na estruturação dos dados e declaração firme de variáveis/componentes.
- **Tailwind CSS v4:** Motor de estilo guiado a utilitários e gerenciado por variáveis sem gerar folhas de estilo pesadas globalmente.
- **Zustand:** Gerenciamento dos estados mais complexos e transversais da SPA (ex: Feedbacks/Toasts).
- **React Router v7:** Gestão de mudança de componentes na DOM via navegação fluida de Single Page Application.

## ⚙️ Como executar na sua máquina

Para rodar este projeto que serve como ambiente de front-end do projeto, siga as etapas abaixo.

1. **Clone o repositório:**
```sh
git clone https://github.com/SeuUsuario/proveup.git
```
2. **Navegue até a pasta alvo:**
```sh
cd proveup
```
3. **Instale as dependências essenciais:**
```sh
npm install
```
4. **Acione o script de desenvolvimento:**
```sh
npm run dev
```
Após executar, o Vite criará um link `localhost` (geralmente na porta 5173).

## 📄 Requisitos Não Funcionais & Estrutura

Toda a arquitetura sob o caminho `/src/components` está dividida em `ui`, `sections` e `layout`. Ao adicionar novos componentes de formulário, obedeça a regra de acoplá-los nas pastas puramente visuais (`/ui/`), não contaminando as telas de `/pages/`. Atualmente o projeto também prioriza o foco total visual em uso no formato **Desktop** (responsividade de navegação mobile está engatilhada para processos futuros).
=======
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
>>>>>>> cab9461b75b7f04df8793dec543c56166fddde16
