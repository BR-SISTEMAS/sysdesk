import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import authService from '../services/authService';
import type { LoginCredentials, RegisterData, AuthResponse } from '../services/authService';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  organizationId: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
  testValue?: Partial<AuthContextType>;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children, testValue }) => {
  // Se testValue for fornecido, use-o diretamente (para testes)
  if (testValue) {
    const value = {
      user: null,
      isLoading: false,
      isAuthenticated: false,
      login: async () => {},
      register: async () => {},
      logout: async () => {},
      updateUser: () => {},
      ...testValue,
    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  }

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar usuário do localStorage ao inicializar
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = authService.getStoredUser();
        if (storedUser && authService.isAuthenticated()) {
          // Verificar se o token ainda é válido
          const currentUser = await authService.getCurrentUser();
          setUser(currentUser);
        }
      } catch (error) {
        // Token inválido ou expirado
        console.error('Erro ao carregar usuário:', error);
        localStorage.clear();
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      const response: AuthResponse = await authService.login(credentials);
      setUser(response.user);
    } catch (error: any) {
      console.error('Erro ao fazer login:', error);
      throw new Error(error.response?.data?.message || 'Erro ao fazer login');
    }
  };

  const register = async (data: RegisterData) => {
    try {
      const response: AuthResponse = await authService.register(data);
      setUser(response.user);
    } catch (error: any) {
      console.error('Erro ao registrar:', error);
      throw new Error(error.response?.data?.message || 'Erro ao registrar usuário');
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      // Mesmo com erro, limpar o estado local
      setUser(null);
    }
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
