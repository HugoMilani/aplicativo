import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/Loading';

const LoginScreen = () => {
  const [username, setUsername] = useState('johnd'); // Usuário de teste da Fake Store
  const [password, setPassword] = useState('m3conley'); // Senha de teste da Fake Store
  const [localLoading, setLocalLoading] = useState(false);
  
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Erro', 'Preencha todos os campos para continuar.');
      return;
    }

    setLocalLoading(true);
    // A função login no AuthContext fará a chamada de API e definirá o token.
    const success = await login(username, password);
    setLocalLoading(false);

    if (!success) {
      // O erro é tratado e exibido no AuthContext (Alert.alert).
      // Se a falha ocorreu devido a um problema de rede ou credenciais inválidas.
    }
  };

  // Se o login local estiver carregando, mostramos o ActivityIndicator no botão.
  const isButtonDisabled = localLoading;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fake Store App</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      
      <Button 
        title={localLoading ? "Entrando..." : "Entrar"} 
        onPress={handleLogin} 
        disabled={isButtonDisabled}
      />

      {/* Requisito: Feedback visual de carregamento */}
      {localLoading && (
          <ActivityIndicator 
              style={{marginTop: 10}} 
              size="small" 
              color="#0000ff" 
          />
      )}
      
      <Text style={styles.info}>
        Usuários de teste da API: 'johnd' / 'm3conley' ou 'mor_2314' / '83r5g'
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 30, backgroundColor: '#f5f5f5' },
    title: { fontSize: 28, textAlign: 'center', marginBottom: 40, fontWeight: 'bold' },
    input: { 
        height: 50, 
        borderColor: '#ccc', 
        borderWidth: 1, 
        borderRadius: 5,
        marginBottom: 15, 
        paddingHorizontal: 15,
        backgroundColor: '#fff'
    },
    info: { 
        marginTop: 30, 
        textAlign: 'center', 
        color: '#666', 
        fontSize: 12
    }
});

export default LoginScreen;