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
