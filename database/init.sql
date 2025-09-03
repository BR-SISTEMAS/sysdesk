-- SysDesk - Inicialização do Banco de Dados
-- MariaDB 10.11+ compatível

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- Criar usuário de aplicação (se não existir) e permissões básicas
CREATE USER IF NOT EXISTS 'sysdesk_user'@'%' IDENTIFIED BY 'sysdesk_pass';
GRANT ALL PRIVILEGES ON sysdesk.* TO 'sysdesk_user'@'%';
-- Permissões extras para shadow database do Prisma
GRANT CREATE, DROP, ALTER, INDEX, REFERENCES ON *.* TO 'sysdesk_user'@'%';
GRANT SELECT, INSERT, UPDATE, DELETE ON *.* TO 'sysdesk_user'@'%';
FLUSH PRIVILEGES;

-- Criar database se não existir
CREATE DATABASE IF NOT EXISTS `sysdesk` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Usar o database
USE `sysdesk`;

-- Configurações de sessão
SET SESSION sql_mode = 'STRICT_TRANS_TABLES,NO_ZERO_DATE,NO_ZERO_IN_DATE,ERROR_FOR_DIVISION_BY_ZERO';

-- Log da inicialização
SELECT 'SysDesk Database Initialization Started' as message;

-- Verificar se as tabelas já existem
SHOW TABLES;

-- Log de sucesso
SELECT 'SysDesk Database Ready for Prisma Migrations' as message;

SET FOREIGN_KEY_CHECKS = 1;
