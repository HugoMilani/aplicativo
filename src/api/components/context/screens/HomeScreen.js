import React, { useState, useEffect, useLayoutEffect } from 'react';
import { 
    View, Text, FlatList, StyleSheet, 
    TouchableOpacity, Alert, Image, ActivityIndicator 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Para os ícones do header

import fakeStoreApi from '../api/fakeStoreApi';
import Loading from '../components/Loading';
import { useAuth } from '../context/AuthContext';
import { formatPrice } from '../utils/format';

// ------------------------------------------
// Componente para um item da lista (Requisito 2)
// ------------------------------------------
const ProductItem = ({ product, onPress }) => (
    <TouchableOpacity 
        style={styles.productItem} 
        onPress={() => onPress(product.id)}
    >
        {/* Requisito: Imagem do Produto */}
        <Image 
            source={{ uri: product.image }} 
            style={styles.productImage} 
        />
        <View style={styles.productInfo}>
            {/* Requisito: Nome do Produto */}
            <Text 
                style={styles.productName} 
                numberOfLines={2}
            >
                {product.title}
            </Text>
            {/* Requisito: Preço Formatado */}
            <Text style={styles.productPrice}>
                {formatPrice(product.price)}
            </Text>
        </View>
    </TouchableOpacity>
);

// ------------------------------------------
// Tela Home Principal
// ------------------------------------------
const HomeScreen = ({ navigation }) => {
  const { logout } = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- Lógica do Header (Requisito: Stack Navigation com headers personalizados) ---
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Produtos",
      // Esquerda: Botão de Logout
      headerLeft: () => (
        <TouchableOpacity style={{marginLeft: 15}} onPress={logout}>
          <Ionicons name="log-out-outline" size={26} color="#333" />
        </TouchableOpacity>
      ),
      // Direita: Botão de Informações
      headerRight: () => (
        <TouchableOpacity style={{marginRight: 15}} onPress={() => navigation.navigate('GroupInfo')}>
          <Ionicons name="information-circle-outline" size={26} color="#333" />
        </TouchableOpacity>
      ),
    });
  }, [navigation, logout]); // Dependências garantem que o header atualize se 'logout' ou 'navigation' mudar

  // --- Carregamento de Dados ---
  const fetchProducts = async (category = null) => {
    setLoading(true);
    try {
      // Endpoint muda se uma categoria for selecionada (Filtro por categorias)
      const endpoint = category 
        ? `/products/category/${category}`
        : '/products';
        
      const response = await fakeStoreApi.get(endpoint);
      setProducts(response.data);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
      Alert.alert("Erro", "Falha ao carregar a lista de produtos.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fakeStoreApi.get('/products/categories');
      setCategories(response.data);
    } catch (error) {
      console.error("Erro ao carregar categorias:", error);
    }
  };

  // Carrega a lista de categorias assim que a tela monta
  useEffect(() => {
    fetchCategories();
  }, []);

  // Recarrega os produtos sempre que a categoria selecionada mudar
  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory]);

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  const handleClearFilter = () => {
    // Requisito: O usuário deve poder limpar o filtro
    setSelectedCategory(null);
  };

  // Enquanto os dados não carregam, e a lista está vazia
  if (loading && products.length === 0) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      
      {/* --- Filtro por Categorias --- */}
      <View style={styles.filterContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          // Adiciona a opção 'Todos' para limpar o filtro
          data={['Todos', ...categories]}
          keyExtractor={(item) => item}
          renderItem={({ item }) => {
            const isActive = (item === 'Todos' && !selectedCategory) || item === selectedCategory;
            return (
              <TouchableOpacity
                style={[
                  styles.categoryButton,
                  isActive ? styles.categoryButtonActive : null,
                ]}
                onPress={() => item === 'Todos' ? handleClearFilter() : handleSelectCategory(item)}
              >
                <Text style={isActive ? styles.categoryTextActive : styles.categoryText}>
                  {item.toUpperCase()}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {/* --- Lista de Produtos (FlatList) --- */}
      {/* Requisito: Mostrar ActivityIndicator se a lista estiver carregando, mas não vazia */}
      {loading && products.length > 0 ? (
          <View style={{paddingVertical: 20}}><ActivityIndicator size="large" color="#007bff" /></View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <ProductItem 
              product={item} 
              onPress={(id) => navigation.navigate('Details', { productId: id })} 
            />
          )}
          numColumns={2} // Exibe os produtos em duas colunas
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    list: { paddingHorizontal: 5 },
    
    // Estilos do Filtro
    filterContainer: { paddingVertical: 10, paddingHorizontal: 5, borderBottomWidth: 1, borderBottomColor: '#eee' },
    categoryButton: { 
        paddingVertical: 8, 
        paddingHorizontal: 12, 
        marginHorizontal: 4, 
        borderRadius: 20, 
        borderWidth: 1, 
        borderColor: '#ccc', 
    },
    categoryButtonActive: { borderColor: '#007bff', backgroundColor: '#007bff' },
    categoryText: { color: '#333', fontSize: 12 },
    categoryTextActive: { color: '#fff', fontWeight: 'bold', fontSize: 12 },

    // Estilos do Item de Produto
    productItem: { 
        flex: 1, 
        margin: 5, 
        backgroundColor: '#fff', 
        borderRadius: 8, 
        elevation: 2, 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 1 }, 
        shadowOpacity: 0.2, 
        shadowRadius: 1.41,
        padding: 10,
        alignItems: 'center'
    },
    productImage: { width: '100%', height: 120, resizeMode: 'contain', marginBottom: 10 },
    productInfo: { width: '100%', alignItems: 'flex-start' },
    productName: { fontSize: 14, fontWeight: 'bold', marginBottom: 5, color: '#333' },
    productPrice: { fontSize: 16, color: '#28a745', fontWeight: '600' }
});

export default HomeScreen;