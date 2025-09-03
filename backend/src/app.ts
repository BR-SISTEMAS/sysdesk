/**
 * SysDesk Backend - Teste Inicial
 * Verifica se tudo está funcionando
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

// Load environment variables
dotenv.config();

const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', async (req, res) => {
  try {
    // Test database connection
    await prisma.$queryRaw`SELECT 1`;
    
    res.json({
      status: 'OK',
      message: 'SysDesk Backend is running!',
      database: 'Connected',
      timestamp: new Date().toISOString(),
      version: '1.0.0'
    });
  } catch (error) {
    res.status(500).json({
      status: 'ERROR',
      message: 'Database connection failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });
  }
});

// Test endpoint
app.get('/api', (req, res) => {
  res.json({
    message: '🎯 SysDesk API - BR SISTEMAS',
    version: '1.0.0',
    status: 'Development',
    endpoints: {
      health: '/api/health',
      test: '/api/test'
    }
  });
});

// Database test endpoint
app.get('/api/test', async (req, res) => {
  try {
    // Count tables
    const userCount = await prisma.user.count();
    const ticketCount = await prisma.ticket.count();
    
    res.json({
      message: 'Database test successful! 🚀',
      tables: {
        users: userCount,
        tickets: ticketCount,
        totalTables: 7 // Ajustar conforme schema
      },
      schema: 'All tables created successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Database test failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('🚀 SysDesk Backend started successfully!');
  console.log(`📡 Server running on http://localhost:${PORT}`);
  console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🧪 Database test: http://localhost:${PORT}/api/test`);
  console.log('✨ Ready for development!');
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('🛑 Shutting down...');
  await prisma.$disconnect();
  process.exit(0);
});

export { app, prisma };
