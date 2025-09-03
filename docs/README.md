# SysDesk v2.0 – Playbook Gamificado de Sprints (Agent Mode)

Bem-vindo(a) ao Playbook Gamificado do SysDesk! Este guia transforma o desenvolvimento em uma jornada de “levels” para o Agente de IA e o time, com missões (quests), chefões (boss fights), XP, badges e um workflow passo a passo por sprint até a vitória final: build do projeto em produção com todas as funcionalidades OK.

Se você é um Agente (IA ou humano), siga as regras, use as ferramentas certas, complete os desafios e avance de nível rumo à Sprint Final.

---

## Sumário
- [Visão Geral do Projeto](#visão-geral-do-projeto)
- [Regras Oficiais de Desenvolvimento](#regras-oficiais-de-desenvolvimento)
- [Ferramentas do Agente (Toolbox)](#ferramentas-do-agente-toolbox)
- [Mecânicas do Jogo (Gamificação)](#mecânicas-do-jogo-gamificação)
- [Workflow de Sprints (v2.0)](#workflow-de-sprints-v20)
  - [Sprint 1 – Fundação: Setup e Infra](#sprint-1--fundação-setup-e-infra)
  - [Sprint 2 – Autenticação](#sprint-2--autenticação)
  - [Sprint 3 – Tickets Base](#sprint-3--tickets-base)
  - [Sprint 4 – Chat em Tempo Real](#sprint-4--chat-em-tempo-real)
  - [Sprint 5 – Dashboard de Suporte](#sprint-5--dashboard-de-suporte)
  - [Sprint 6 – Administrativo e Métricas](#sprint-6--administrativo-e-métricas)
  - [Sprint 7 – Polimento, Segurança e Produção](#sprint-7--polimento-segurança-e-produção)
- [Chefe Final – Build e Entrega](#chefe-final--build-e-entrega)
- [Templates de Quests e PR](#templates-de-quests-e-pr)
- [Dicionário de Diretórios e Arquivos](#dicionário-de-diretórios-e-arquivos)

---

## Visão Geral do Projeto
- Repositório: https://github.com/BR-SISTEMAS/sysdesk
- Objetivo: Internalizar o atendimento, iniciando com chat de suporte, e evoluir para um hub de aplicações.
- Status: Desenvolvimento contínuo
- Stack:
  - Frontend: React 18 + TS, MUI, Styled Components, Redux Toolkit + RTK Query, React Router v6, Socket.IO Client, Vite
  - Backend: Node 18 LTS, Express + TS, Prisma (MariaDB 10.11+), JWT + bcrypt, Joi, Socket.IO, Swagger/OpenAPI
  - DevOps: Docker + Docker Compose, Nginx, GitHub Actions CI/CD

Referência de escopo v1.0.0: docs/sysdesk_scope_v1.0.0.md (base consolidada de arquitetura e features)

---

## Regras Oficiais de Desenvolvimento
As seguintes regras são obrigatórias durante toda a jornada. Quebre-as e perderá XP! Siga-as e ganhe bônus de velocidade e qualidade.

1) Estrutura e Organização
- Seguir a estrutura de pastas definida no escopo. Não crie arquivos fora do padrão.
- Cada feature deve ter sua própria branch: feature/nome-da-feature
- Commits no padrão: tipo(escopo): descrição (ex.: feat(auth): implementar fluxo de login)

2) Antes de Codar
- Consulte a documentação (sysdesk_scope_v1.0.0) antes de implementar
- Crie testes antes de implementar (TDD)
- Valide dependências no package.json

3) Padrões de Código
- Backend TS: use interfaces para tipos; validação com Joi; use try-catch em async; Prisma para queries; nunca SQL direto; crie migrations para mudanças de schema
- Frontend TS: componentes funcionais; hooks do React; MUI para UI; styled-components para estilos customizados

4) Banco de Dados
- Sempre Prisma; nunca SQL cru; migrations obrigatórias
- Numeração de tickets: BR-YYMM-NNNN

5) Git Workflow
- Branches: main -> develop -> feature/*
- Sempre PR para develop; incluir testes
- Commits atômicos e descritivos

6) Docker
- Testar em containers antes de commitar
- docker-compose para desenvolvimento; volumes para hot-reload

7) Validação de Tarefas
- Entregar 100% testado; documentar decisões técnicas

8) Rastreabilidade
- Criar issues para cada feature; linkar commits com issues (#numero)
- Manter CHANGELOG.md; documentar APIs via Swagger

9) Prevenção de Alucinações
- Nunca assumir implementações – sempre verificar no código
- Ler o arquivo antes de editar; verificar imports
- Testar cada mudança incrementalmente; se errar, parar e diagnosticar antes de continuar

10) Comandos de Verificação Frequentes
- git status
- docker ps
- npm test
- git log --oneline -5
- tree -L 2 . (ou equivalente no Windows)
- npm list --depth=0

---

## Ferramentas do Agente (Toolbox)
As ferramentas a seguir são permitidas e recomendadas. Seguir as melhores práticas de segurança de segredos e execução.

CLI Essenciais
- Git: versionamento, branches, PRs
- Docker/Docker Compose: orquestração local
- Node/NPM: scripts, build, testes
- Prisma: generate, migrate
- Vite: dev/build do frontend
- OpenAPI/Swagger: documentação de API

Gestão de Segredos
- Use variáveis de ambiente (ex.: JWT_SECRET) – nunca exponha valores em texto claro nos comandos/PRs
- Exemplo seguro: definir variável antes e referenciar; não imprimir segredos

Apoio ao Agente (Automação/IA)
- Consultas a documentação de libs antes de uso (ex.: RTK Query, Joi, Socket.IO)
- Seguir o escopo sysdesk_scope_v1.0.0 para confirmar nomes de arquivos, endpoints e fluxos

---

## Mecânicas do Jogo (Gamificação)
Papéis
- Player: Agente (IA/humano) que executa as quests
- Game Master (GM): Tech Lead/Reviewer que aprova PRs e avalia critérios
- QA: valida cenários de teste e critérios de aceitação

Progressão
- O projeto é dividido em 7 Sprints (Levels 1 a 7)
- Cada sprint possui Quests com tarefas pequenas e objetivas
- Boss Fight no final de cada sprint: critérios de aceitação e DoD devem estar 100% verdes

Pontuação (XP)
- +5 XP: Testes unitários cobrindo o código novo (mín. 80% da unidade)
- +3 XP: Documentação atualizada (README/Swagger/CHANGELOG)
- +3 XP: Pipeline CI verde no PR
- +2 XP: Commits atômicos e padrão respeitado
- +1 XP: Scripts de automação úteis (npm scripts, docker)
- -5 XP: Falha de lint/test que chega ao PR (corrija localmente antes)
- -10 XP: Quebra de regra de segurança (segredo exposto, SQL cru, etc.)

Badges
- Container Commander (Sprint 1): Docker Compose sobe sem erros, volumes OK
- Gatekeeper (Sprint 2): Auth e guards funcionam com testes verdes
- Number Smith (Sprint 3): Numeração BR-YYMM-NNNN com testes e casos de borda
- Real-time Ranger (Sprint 4): Mensagens em tempo real estáveis (e2e feliz)
- Queue Master (Sprint 5): Fila e atribuição operacionais
- Overseer (Sprint 6): Dashboard admin e métricas
- Hardener (Sprint 7): Segurança, logs, config prod OK

Regras de Vitória por Sprint (DoD)
- Todos os testes definidos no sprint passam (unit/integration/e2e quando aplicável)
- Swagger e README atualizados
- Branch feature/* mergeada em develop via PR aprovado
- Sem TODOs críticos deixados para depois

---

## Workflow de Sprints (v2.0)
Abaixo, cada sprint é quebrada em Quests com passos acionáveis, critérios de aceitação e verificações. Use issues do GitHub para cada Quest e referencie-as nos commits/PRs.

### Sprint 1 – Fundação: Setup e Infra
Objetivo: Ambiente estável em containers, schema inicial do banco e estrutura do projeto pronta.

Quests
1.1 Docker Setup (Badge: Container Commander)
- Criar/validar docker-compose.yml com serviços: sysdesk-db, sysdesk-backend, sysdesk-frontend
- Garantir volumes de hot-reload para backend/frontend
- Critérios: docker-compose up -d executa sem erros; docker ps mostra três containers UP
- Verificações: docker ps; logs sem erros críticos

1.2 Database Schema (Prisma + MariaDB)
- Definir schema.prisma com User, Ticket, Message, enums Role/Status/Priority
- Rodar prisma migrate dev e prisma generate
- Critérios: Tabelas criadas; conexão OK com DATABASE_URL; seeds opcionais
- Verificações: npx prisma migrate dev; app conecta sem erro

1.3 Estrutura do Projeto
- Garantir estrutura conforme escopo: backend/src/*, frontend/src/*, docs/, .github/workflows
- Critérios: Árvore compatível com o escopo; scripts npm mínimos definidos
- Verificações: tree -L 2 . (ou equivalente no Windows)

1.4 CI Básico
- Configurar GitHub Actions para lint/test (mínimo backend e frontend)
- Critérios: PR para develop dispara CI e fica verde

Boss Fight Sprint 1
- docker-compose up -d OK
- prisma migrate dev OK
- CI verde no PR de feature/docker-setup e feature/database-schema

### Sprint 2 – Autenticação
Objetivo: API de autenticação com JWT, validação, CRUD básico de usuários, telas de login/registro e rotas protegidas.

Quests
2.1 Auth Backend
- Endpoints: POST /api/auth/register, /login, /refresh, /logout; GET /api/auth/profile
- Validação com Joi; senha com bcrypt; tokens com expiração; refresh token se aplicável
- Middleware: auth.middleware.ts (verificar roles)
- Critérios: Testes unitários de serviços/repos; integração dos endpoints; Swagger atualizado

2.2 User Management Backend
- CRUD básico (list, get, update role, deactivate)
- Critérios: Permissões por role; testes

2.3 Auth Frontend
- Telas: Login, Register; MUI + validação
- Estado: authSlice + RTK Query (authApi)
- ProtectedRoute e AuthGuard
- Critérios: Fluxo completo login->rota protegida; logout limpa estado; testes de componentes

Boss Fight Sprint 2 (Badge: Gatekeeper)
- Usuário consegue registrar, logar, acessar rota protegida e deslogar
- Testes unitários e integração verdes
- Swagger com auth endpoints
- PR aprovado e merge em develop

### Sprint 3 – Tickets Base
Objetivo: CRUD de tickets com numeração BR-YYMM-NNNN, estados e UI inicial do cliente.

Quests
3.1 Ticket Numbering
- utils/ticket-number.utils.ts com geração mensal incremental
- Query Prisma buscando último ticket do mês e computando sequência
- Critérios: Cobrir casos de borda (mês vira, sequência reinicia)
- Testes unitários do gerador

3.2 Ticket CRUD + Status Machine
- Endpoints: criar, listar, detalhar, atualizar status, fechar
- Regras de transição de estado e permissões
- Testes de integração cobrindo transitions

3.3 Client Dashboard (Frontend)
- Listagem de tickets, criação, detalhes
- Integração com ticketApi (RTK Query)
- Critérios: UX funcional; estados de loading/erro; testes de componentes

Boss Fight Sprint 3 (Badge: Number Smith)
- Criação automática de tickets com numeração correta
- Transições válidas; testes OK
- UI cliente operante para CRUD básico

### Sprint 4 – Chat em Tempo Real
Objetivo: Canal de chat por ticket com Socket.IO.

Quests
4.1 Socket.IO Setup
- backend/src/services/socket.service.ts com rooms por ticket
- Eventos: join-ticket, send-message, new-message
- Persistência de mensagens no banco

4.2 Chat UI
- Components: ChatWindow, MessageList, MessageInput, TypingIndicator
- Integração com socket.service.ts (frontend)

4.3 Upload de Arquivos (básico)
- Endpoint e UI para anexos no chat (pelo menos imagens)

Boss Fight Sprint 4 (Badge: Real-time Ranger)
- Mensagens fluem em tempo real para participantes do ticket
- Testes e2e do fluxo feliz; sem mensagens duplicadas

### Sprint 5 – Dashboard de Suporte
Objetivo: Interface do time de suporte, fila de atendimento e múltiplas conversas.

Quests
5.1 Support Dashboard
- Painel com tickets abertos, filtragem e priorização

5.2 Ticket Queue & Assignment
- Fila e atribuição de chamados a atendentes; regras de lock/ownership

5.3 Multichat
- Suporte a múltiplas conversas ativas para um atendente

Boss Fight Sprint 5 (Badge: Queue Master)
- Fila funcional; atribuição consistente; métricas básicas

### Sprint 6 – Administrativo e Métricas
Objetivo: Dashboard administrativo, convites e relatórios/KPIs.

Quests
6.1 Admin Dashboard
- Gerenciar usuários, permissões, configurações do sistema

6.2 Invite System
- Envio de convites por email; aceitação e definição de senha

6.3 Metrics & Reporting
- KPIs por perfil (cliente, suporte, administração)

Boss Fight Sprint 6 (Badge: Overseer)
- Admin consegue gerenciar; convites funcionam; métricas visíveis

### Sprint 7 – Polimento, Segurança e Produção
Objetivo: Harden, observabilidade e configuração de produção.

Quests
7.1 Performance & Error Handling
- Melhorias de performance; tratamento de erros robusto no backend e frontend

7.2 Logging & Monitoring
- Logs estruturados; integração com ferramenta de observabilidade (a definir)

7.3 Production Config
- Nginx; HTTPS; headers de segurança (CSP, CORS), rate limiting

Boss Fight Sprint 7 (Badge: Hardener)
- Build de produção pronto; validações de segurança; deploy automatizado

---

## Chefe Final – Build e Entrega
Objetivo: Gerar build frontend/backend em containers, rodar migrações, subir infra de prod e validar smoke tests.

- docker-compose -f docker-compose.prod.yml up -d
- Rodar migrações Prisma em ambiente de produção
- Validar endpoints críticos (auth, tickets, chat)
- Executar smoke e2e mínimos (login, criar ticket, enviar mensagem)
- Atualizar CHANGELOG.md e criar tag/release

Condição de Vitória
- Todas as sprints concluídas e aprovadas
- Pipelines verdes
- Documentação atualizada
- Release publicada (ex.: v1.0.0)

---

## Templates de Quests e PR
Quest (Issue) Template
- Título: [Sprint X] Quest: <nome curto>
- Descrição: O que será implementado
- Tarefas:
  - [ ] Passo 1
  - [ ] Passo 2
  - [ ] Testes: unit/integration/e2e
  - [ ] Docs: Swagger/README/CHANGELOG
- Critérios de Aceitação (DoD):
- Riscos/Dependências:
- Estimativa (Story Points/XP):

PR Template (SysDesk)
- Descrição
- Funcionalidades implementadas
- Testes (como validar)
- Screenshots (se aplicável)
- Issues Relacionadas: Closes #X

---

## Dicionário de Diretórios e Arquivos
- backend/
  - src/controllers, middleware, routes, services, utils, types
  - prisma/schema.prisma, migrations
  - tests/unit, integration, e2e
- frontend/
  - src/components (auth, chat, tickets, dashboard), pages, services, store, styles, utils, types
- docs/
  - README.md (este playbook), API_DOCUMENTATION.md, DEPLOYMENT.md, DEVELOPMENT_SETUP.md, DATABASE_SCHEMA.md, USER_MANUAL.md
- .github/workflows
  - ci.yml, cd.yml, pr-checks.yml
- docker-compose.yml, docker-compose.prod.yml
- CHANGELOG.md, .env.example

---

Boa jornada, Agente! Complete as Quests, derrote os Bosses, ganhe badges e leve o SysDesk ao build final. Cada commit conta. Cada teste faz diferença. GL & HF!
