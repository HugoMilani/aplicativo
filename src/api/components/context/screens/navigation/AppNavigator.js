import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext';

// Importa as Telas
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import GroupInfoScreen from '../screens/GroupInfoScreen';
import Loading from '../components/Loading'; // Componente que vamos criar

const Stack = createStackNavigator();

// --- 1. Pilha do Aplicativo (Telas visíveis após o login) ---
const AppStack = () => (
  <Stack.Navigator>
    {/* A tela Home terá o header customizado, definido no próprio componente */}
    <Stack.Screen 
      name="Home" 
      component={HomeScreen} 
      options={{ headerTitle: "Produtos" }} 
    />
    <Stack.Screen 
      name="Details" 
      component={DetailsScreen} 
      options={{ title: "Detalhes do Produto" }} 
    />
    <Stack.Screen 
      name="GroupInfo" 
      component={GroupInfoScreen} 
      options={{ title: "Informações do Grupo" }} 
    />
  </Stack.Navigator>
);

// --- 2. Pilha de Autenticação (Somente tela de Login) ---
const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="Login" 
      component={LoginScreen} 
      options={{ headerShown: false }} // Não precisamos de header na tela de login
    />
  </Stack.Navigator>
);

// --- 3. O Navegador Raiz que escolhe a pilha ---
const AppNavigator = () => {
  const { userToken, isLoading } = useAuth(); // Pega o estado do nosso contexto

  // Requisito 6: Exibir ActivityIndicator enquanto checa o estado inicial
  if (isLoading) {
    return <Loading />; 
  }

  return (
    <NavigationContainer>
      {/* Se houver token, mostra as telas do App; senão, mostra o Login */}
      {userToken ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;