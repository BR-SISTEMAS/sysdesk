# SysDesk - Sistema de Atendimento BR SISTEMAS (v2.0)

![SysDesk Banner](https://via.placeholder.com/1024x220/1976d2/ffffff?text=SysDesk+-+BR+SISTEMAS)

O SysDesk é o hub interno de atendimento da BR SISTEMAS. Esta versão 2.0 traz documentação robusta, workflow de sprints gamificado e guias práticos para desenvolvimento, testes e deploy.

Links rápidos
- Playbook Gamificado v2.0: docs/README.md
- Repositório: https://github.com/BR-SISTEMAS/sysdesk

Sumário
- Visão Geral
- Stack Tecnológica
- Estrutura do Projeto
- Setup de Desenvolvimento
- Docker / Containers
- Banco de Dados (Prisma)
- Testes
- CI/CD
- Workflow Git e Commits
- Segurança
- Contribuição
- Suporte

Visão Geral
- Objetivo: Internalizar o sistema de atendimento (chat de suporte e evoluções)
- Status: Desenvolvimento contínuo
- Pilares: Qualidade (testes), Documentação, Observabilidade, Segurança

Stack Tecnológica
Frontend
- React 18 + TypeScript, MUI, Styled Components
- Redux Toolkit + RTK Query, React Router v6
- Socket.IO Client, Vite
Backend
- Node.js 18 LTS, Express + TypeScript
- Prisma ORM (MariaDB 10.11+)
- JWT + bcrypt, Joi, Socket.IO
- Swagger/OpenAPI
DevOps
- Docker + Docker Compose, Nginx
- GitHub Actions (CI/CD)

Estrutura do Projeto (alto nível)
```
sysdesk/
├── .github/ (workflows, templates)
├── backend/ (API Express + TS)
├── frontend/ (React + Vite)
├── database/ (scripts e seeds)
├── nginx/ (config produção)
├── docs/ (playbook e documentação)
├── scripts/ (automação)
├── docker-compose.yml
└── README.md
```

Setup de Desenvolvimento
1) Clonar e acessar o projeto
- git clone https://github.com/BR-SISTEMAS/sysdesk.git
- cd sysdesk
- git checkout develop
2) Variáveis de ambiente
- cp .env.example .env
- Edite a .env conforme necessário (NUNCA commitar segredos)
3) Subir containers
- docker-compose up -d
4) Instalar dependências e preparar backend
- cd backend && npm install
- npx prisma generate
- npx prisma migrate dev
5) Instalar dependências frontend
- cd ../frontend && npm install
6) Acessos padrão
- Frontend: http://localhost:3000
- API: http://localhost:5000
- DB: localhost:3306

Docker / Containers
- docker-compose up -d: sobe banco, backend e frontend
- docker-compose logs -f <service>: inspeciona logs
- Em produção: docker-compose -f docker-compose.prod.yml up -d

Banco de Dados (Prisma)
- Migrations obrigatórias para qualquer mudança de schema
- Comandos úteis:
  - npx prisma generate
  - npx prisma migrate dev
  - npx prisma studio (se instalado)

Testes
Backend
- cd backend && npm test
Frontend
- cd frontend && npm test
Política
- Escrever testes antes (TDD quando possível)
- Cobrir fluxos críticos (auth, tickets, chat)

CI/CD
- PRs para develop disparam CI (lint/test)
- Não mergear PR com CI vermelho
- CD configurável via workflows em .github/workflows

Workflow Git e Commits
- Branches: main (prod), develop (dev), feature/*, hotfix/*
- Commits (exemplos):
  - feat(auth): implementar fluxo de login com Joi
  - fix(chat): corrigir duplicação de mensagens
  - docs(api): adicionar endpoints de tickets no Swagger
  - chore(docker): persistência de volume MariaDB
- Sempre criar PR para develop com testes e documentação

Segurança
- Sem SQL direto – apenas Prisma
- Validação e sanitização de inputs (Joi)
- Rate limiting em endpoints críticos
- HTTPS em produção, CORS/CSP adequados
- Segredos via variáveis de ambiente (NUNCA em commits)

Contribuição
1) Crie uma branch: git checkout -b feature/nome
2) Commits atômicos: tipo(escopo): descrição
3) Testes + docs atualizados
4) Abra PR para develop usando o template
5) Aguarde aprovação e CI verde

Playbook Gamificado (Sprints)
Para um passo a passo com Quests, Badges, DoD e Boss Fights por sprint, acesse:
- docs/README.md (Playbook Gamificado v2.0)

Suporte
- Issues: https://github.com/BR-SISTEMAS/sysdesk/issues
- Contato: desenvolvimento@brsistemas.com.br

