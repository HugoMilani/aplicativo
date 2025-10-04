import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const GroupInfoScreen = () => {
  // Requisito: Dados dos membros do grupo (Substitua pelos dados reais!)
  const members = [
    { nome: "Seu Nome Completo", ra: "1234567" },
    { nome: "Nome do Membro 2", ra: "7654321" },
    { nome: "Nome do Membro 3", ra: "9876543" },
    // Adicione mais membros aqui, se necessário
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Informações do Projeto</Text>
      
      {/* Requisito: Descrição do aplicativo */}
      <Text style={styles.description}>
        Este é um aplicativo mobile de e-commerce desenvolvido em **React Native com Expo**, 
        utilizando a **Fake Store API** para simulação de dados. O projeto inclui funcionalidades 
        essenciais como autenticação, listagem filtrada e exibição de detalhes do produto.
      </Text>

      <View style={styles.membersList}>
        <Text style={styles.subheader}>Desenvolvedores:</Text>
        
        {members.map((member, index) => (
          <View key={index} style={styles.memberItem}>
            <Text style={styles.memberText}>
              <Text style={styles.boldText}>Nome:</Text> {member.nome}
            </Text>
            <Text style={styles.memberText}>
              <Text style={styles.boldText}>RA:</Text> {member.ra}
            </Text>
          </View>
        ))}
      </View>
      
      <Text style={styles.footer}>
        Projeto desenvolvido para a disciplina de Desenvolvimento Mobile.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: { 
        padding: 25, 
        backgroundColor: '#f9f9f9', 
        minHeight: '100%'
    },
    header: { 
        fontSize: 26, 
        fontWeight: 'bold', 
        marginBottom: 20, 
        color: '#333', 
        textAlign: 'center' 
    },
    description: { 
        fontSize: 16, 
        textAlign: 'justify', 
        marginBottom: 30, 
        lineHeight: 24, 
        color: '#555',
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderLeftWidth: 5,
        borderLeftColor: '#007bff'
    },
    membersList: { 
        padding: 15, 
        backgroundColor: '#fff', 
        borderRadius: 8, 
        marginBottom: 30 
    },
    subheader: { 
        fontSize: 20, 
        fontWeight: 'bold', 
        marginBottom: 15,
        color: '#007bff'
    },
    memberItem: { 
        marginBottom: 15, 
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    },
    memberText: { 
        fontSize: 16,
        lineHeight: 24
    },
    boldText: { 
        fontWeight: 'bold' 
    },
    footer: {
        fontSize: 14,
        textAlign: 'center',
        color: '#aaa',
        marginTop: 20
    }
});

export default GroupInfoScreen;