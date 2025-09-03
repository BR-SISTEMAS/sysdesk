# SysDesk - Sistema de Atendimento BR SISTEMAS

![SysDesk Logo](https://via.placeholder.com/800x200/1976d2/ffffff?text=SysDesk+-+BR+SISTEMAS)

## 🎯 **Sobre o Projeto**

O SysDesk é um sistema de atendimento interno desenvolvido para a BR SISTEMAS, com o objetivo de substituir soluções terceirizadas e criar um hub de aplicações centralizadas. Iniciando com um sistema de chat de suporte em tempo real.

### **Características Principais**
- ✅ Sistema de autenticação completo (JWT)
- ✅ Chat em tempo real (Socket.IO)
- ✅ Numeração automática de tickets (BR-YYMM-NNNN)
- ✅ Dashboard para Cliente, Suporte e Admin
- ✅ Containerização completa com Docker
- ✅ Banco de dados MariaDB
- ✅ Interface moderna com Material-UI

## 🚀 **Stack Tecnológica**

### **Frontend**
- React 18 + TypeScript
- Material-UI (MUI)
- Redux Toolkit + RTK Query
- Socket.IO Client
- Vite
- Styled Components

### **Backend**
- Node.js 18+ LTS
- Express.js + TypeScript
- Prisma ORM
- MariaDB 10.11+
- Socket.IO
- JWT + bcrypt
- Joi validation

### **DevOps**
- Docker + Docker Compose
- Nginx (produção)
- GitHub Actions (CI/CD)

## 📋 **Requisitos**

- [Docker](https://www.docker.com/) e Docker Compose
- [Node.js 18+](https://nodejs.org/)
- [Git](https://git-scm.com/)

## 🛠️ **Setup de Desenvolvimento**

### **1. Clone e Configuração Inicial**
```bash
git clone https://github.com/BR-SISTEMAS/sysdesk.git
cd sysdesk
git checkout develop
```

### **2. Configurar Variáveis de Ambiente**
```bash
cp .env.example .env
# Edite o arquivo .env conforme necessário
```

### **3. Iniciar Containers**
```bash
# Iniciar apenas o banco (primeira vez)
docker-compose up sysdesk-db -d

# Aguardar banco estar pronto e instalar dependências
cd backend && npm install
npx prisma migrate dev
npx prisma generate

cd ../frontend && npm install

# Iniciar todos os serviços
cd ..
docker-compose up -d
```

### **4. Acessar Aplicação**
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Database**: localhost:3306

## 🎫 **Sistema de Tickets**

O SysDesk utiliza um sistema de numeração única para tickets:

**Formato**: `BR-YYMM-NNNN`
- **BR**: Prefixo da empresa
- **YY**: Ano (25 para 2025)
- **MM**: Mês (01 a 12)
- **NNNN**: Sequencial mensal (0001 a 9999)

**Exemplos**:
- `BR-2501-0001` - Primeiro ticket de Janeiro 2025
- `BR-2501-0247` - Ticket #247 de Janeiro 2025
- `BR-2502-0001` - Primeiro ticket de Fevereiro 2025

## 📁 **Estrutura do Projeto**

```
sysdesk/
├── backend/           # API Node.js + Express
├── frontend/          # React App
├── database/          # Scripts SQL e seeds
├── nginx/             # Configuração Nginx
├── scripts/           # Scripts de automação
├── docs/              # Documentação
├── .github/           # GitHub Actions
└── docker-compose.yml # Orquestração Docker
```

## 🔄 **Workflow de Desenvolvimento**

### **Branches**
- `main` - Produção
- `develop` - Desenvolvimento
- `feature/*` - Novas funcionalidades
- `hotfix/*` - Correções críticas

### **Padrão de Commits**
```bash
feat(auth): implementar registro de usuários
fix(chat): corrigir mensagens duplicadas  
docs(api): adicionar documentação Swagger
chore(docker): configurar MariaDB
```

## 🧪 **Testes**

```bash
# Backend
cd backend && npm test

# Frontend
cd frontend && npm test
```

## 🚀 **Deploy**

```bash
# Produção
docker-compose -f docker-compose.prod.yml up -d
```

## 📊 **Roadmap**

### **Fase 1: Fundação** *(Semanas 1-6)*
- [x] Setup Docker + Git
- [x] Sistema de autenticação
- [ ] Sistema básico de tickets
- [ ] Interface inicial

### **Fase 2: Core Features** *(Semanas 7-10)*
- [ ] Chat em tempo real
- [ ] Dashboard de suporte
- [ ] Fila de atendimento

### **Fase 3: Avançado** *(Semanas 11-14)*
- [ ] Dashboard admin
- [ ] Sistema de convites
- [ ] Métricas e relatórios

## 🤝 **Contribuição**

1. Fork o projeto
2. Crie uma branch: `git checkout -b feature/nova-feature`
3. Commit: `git commit -m 'feat: adicionar nova feature'`
4. Push: `git push origin feature/nova-feature`
5. Abra um Pull Request

## 📄 **Licença**

Este projeto é propriedade da **BR SISTEMAS** e está sob licença proprietária.

## 📞 **Suporte**

- **Email**: desenvolvimento@brsistemas.com.br
- **Issues**: [GitHub Issues](https://github.com/BR-SISTEMAS/sysdesk/issues)

---

**Desenvolvido com ❤️ pela equipe BR SISTEMAS**
