/**
 * SysDesk Frontend - Aplicação Principal
 * BR SISTEMAS - Sistema de Atendimento
 */

import { useEffect, useState } from 'react';
import { 
  ThemeProvider, 
  createTheme, 
  CssBaseline,
  Container,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Grid,
  Chip
} from '@mui/material';
import { 
  CheckCircle as CheckIcon,
  Error as ErrorIcon,
  Storage as DatabaseIcon,
  Api as ApiIcon
} from '@mui/icons-material';

// Tema do SysDesk - BR SISTEMAS
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Azul BR SISTEMAS
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#f50057',
      light: '#ff5983',
      dark: '#c51162',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 500,
    },
  },
});

interface HealthStatus {
  status: string;
  message: string;
  database: string;
  timestamp: string;
  version: string;
}

interface DatabaseTest {
  message: string;
  tables: {
    users: number;
    tickets: number;
    totalTables: number;
  };
  schema: string;
}

function App() {
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [dbTest, setDbTest] = useState<DatabaseTest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testBackend = async () => {
      try {
        setLoading(true);
        setError(null);

        // Test API health
        const healthResponse = await fetch('/api/health');
        if (!healthResponse.ok) {
          throw new Error('Backend health check failed');
        }
        const healthData = await healthResponse.json();
        setHealth(healthData);

        // Test database
        const dbResponse = await fetch('/api/test');
        if (!dbResponse.ok) {
          throw new Error('Database test failed');
        }
        const dbData = await dbResponse.json();
        setDbTest(dbData);

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    testBackend();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4, mb: 4, textAlign: 'center' }}>
          <Typography variant="h3" color="primary" gutterBottom>
            🎯 SysDesk - BR SISTEMAS
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Sistema de Atendimento Interno
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Ambiente de desenvolvimento - Testes de integração
          </Typography>
        </Paper>

        {loading && (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
            <CircularProgress size={60} />
            <Typography variant="h6" sx={{ ml: 2 }}>
              Testando conexões...
            </Typography>
          </Box>
        )}

        {error && (
          <Alert 
            severity="error" 
            icon={<ErrorIcon />}
            sx={{ mb: 3 }}
          >
            <Typography variant="h6">Erro de Conexão</Typography>
            <Typography>{error}</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Verifique se o backend está rodando na porta 5000
            </Typography>
          </Alert>
        )}

        {health && dbTest && (
          <Grid container spacing={3}>
            {/* Status da API */}
            <Grid item xs={12} md={6}>
              <Card elevation={2}>
                <CardContent>
                  <Box display="flex" alignItems="center" mb={2}>
                    <ApiIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h5">Status da API</Typography>
                    <Chip 
                      icon={<CheckIcon />}
                      label={health.status}
                      color="success"
                      size="small"
                      sx={{ ml: 'auto' }}
                    />
                  </Box>
                  <Typography variant="body1" gutterBottom>
                    {health.message}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Versão: {health.version}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Última verificação: {new Date(health.timestamp).toLocaleTimeString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Status do Banco */}
            <Grid item xs={12} md={6}>
              <Card elevation={2}>
                <CardContent>
                  <Box display="flex" alignItems="center" mb={2}>
                    <DatabaseIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h5">Status do Banco</Typography>
                    <Chip 
                      icon={<CheckIcon />}
                      label={health.database}
                      color="success"
                      size="small"
                      sx={{ ml: 'auto' }}
                    />
                  </Box>
                  <Typography variant="body1" gutterBottom>
                    {dbTest.schema}
                  </Typography>
                  <Box mt={2}>
                    <Typography variant="body2" color="text.secondary">
                      Tabelas criadas: {dbTest.tables.totalTables}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Usuários: {dbTest.tables.users}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Tickets: {dbTest.tables.tickets}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Próximos Passos */}
            <Grid item xs={12}>
              <Card elevation={2}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    ✅ Setup Concluído com Sucesso!
                  </Typography>
                  <Typography variant="body1" paragraph>
                    O ambiente de desenvolvimento do SysDesk está funcionando perfeitamente:
                  </Typography>
                  <Box component="ul" sx={{ mt: 2 }}>
                    <li>✅ MariaDB rodando via Docker</li>
                    <li>✅ Backend Node.js + TypeScript funcionando</li>
                    <li>✅ Prisma ORM com migrations aplicadas</li>
                    <li>✅ Frontend React + Vite funcionando</li>
                    <li>✅ Comunicação frontend ↔ backend OK</li>
                  </Box>
                  <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
                    📝 Próximas etapas:
                  </Typography>
                  <Box component="ul">
                    <li>Implementar sistema de autenticação</li>
                    <li>Criar CRUD de usuários</li>
                    <li>Desenvolver sistema de tickets</li>
                    <li>Integrar Socket.IO para chat em tempo real</li>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
