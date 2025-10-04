
import React, { createContext, useState, useContext, useEffect } from 'react';
import { Alert } from 'react-native';
import fakeStoreApi from '../api/fakeStoreApi'; // Importa a instância do Axios

// Cria o Contexto
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simula a verificação de token ao iniciar (poderia ser AsyncStorage para persistir)
  useEffect(() => {
    // Aqui você faria a checagem no armazenamento local (ex: AsyncStorage)
    // para ver se o usuário estava logado na última sessão.
    setIsLoading(false); 
  }, []);

  const login = async (username, password) => {
    // 1. Tratamento de Erro Básico
    if (!username || !password) {
      Alert.alert("Erro", "Username e Password são obrigatórios.");
      return false;
    }
    
    // 2. Inicia o Carregamento
    setIsLoading(true);
    
    try {
      // Requisito 9: Opcional, verificar se o usuário existe.
      // Embora o endpoint de login já faça a checagem, consultamos a lista:
      const usersResponse = await fakeStoreApi.get('/users');
      const userExists = usersResponse.data.some(user => user.username === username);

      if (!userExists) {
        Alert.alert("Erro de Login", "Usuário não encontrado.");
        setIsLoading(false);
        return false;
      }

      // 3. Realiza o Login (POST para o endpoint de autenticação)
      const response = await fakeStoreApi.post('/auth/login', {
        username: username,
        password: password,
      });

      const token = response.data.token;
      setUserToken(token);
      // Aqui você salvaria o token no AsyncStorage, se o app fosse persistir o login
      
      return true; // Sucesso no login
    } catch (error) {
      console.error("Erro no login:", error.response ? error.response.data : error.message);
      // Requisito 10: Tratamento de erros
      Alert.alert("Erro de Login", "Credenciais inválidas ou falha de rede.");
      setUserToken(null);
      return false; // Falha no login
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUserToken(null);
    
  };

  return (
    <AuthContext.Provider value={{ userToken, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};