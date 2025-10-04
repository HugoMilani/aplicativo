import React, { useState, useEffect } from 'react';
import { 
    View, Text, Image, StyleSheet, ScrollView, 
    Alert, ActivityIndicator 
} from 'react-native';

import fakeStoreApi from '../api/fakeStoreApi';
import Loading from '../components/Loading';
import { formatPrice } from '../utils/format';

const DetailsScreen = ({ route }) => {
  // Pega o productId passado da tela anterior
  const { productId } = route.params; 
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        // Chama o endpoint de produto específico
        const response = await fakeStoreApi.get(`/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Erro ao carregar detalhes do produto:", error);
        Alert.alert("Erro", "Falha ao carregar os detalhes do produto.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]); // Refaz a busca se o ID mudar

  // Requisito 6: Mostrar o ActivityIndicator enquanto a busca está em andamento
  if (loading) {
    return <Loading />;
  }

  // Se por algum motivo o produto não for encontrado
  if (!product) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Produto não encontrado.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Imagem do Produto */}
      <Image 
        source={{ uri: product.image }} 
        style={styles.productImage} 
      />
      
      {/* Título e Preço */}
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>{formatPrice(product.price)}</Text>
      
      {/* Categoria */}
      <View style={styles.categoryBadge}>
        <Text style={styles.categoryText}>{product.category.toUpperCase()}</Text>
      </View>

      {/* Descrição Completa */}
      <Text style={styles.sectionTitle}>Descrição:</Text>
      <Text style={styles.description}>{product.description}</Text>
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: { 
        padding: 20, 
        backgroundColor: '#fff', 
    },
    errorContainer: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    errorText: {
        fontSize: 16, 
        color: 'red'
    },
    productImage: { 
        width: '100%', 
        height: 300, 
        resizeMode: 'contain', 
        marginBottom: 20,
        backgroundColor: '#f9f9f9',
        borderRadius: 8
    },
    title: { 
        fontSize: 24, 
        fontWeight: 'bold', 
        marginBottom: 10 
    },
    price: { 
        fontSize: 28, 
        fontWeight: '600', 
        color: '#28a745', 
        marginBottom: 15 
    },
    categoryBadge: {
        backgroundColor: '#f0f0f0',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 15,
        alignSelf: 'flex-start',
        marginBottom: 20
    },
    categoryText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#6c757d'
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingBottom: 5
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: '#333'
    }
});

export default DetailsScreen;