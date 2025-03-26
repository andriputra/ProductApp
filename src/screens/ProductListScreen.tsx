import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, TextInput, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/productSlice';
import { RootState, AppDispatch } from '../redux/store';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import ProductDetailScreen from './ProductDetailScreen';

type Product = { id: number; title: string; category: string; thumbnail: string; price: number };

const categories = ['All', 'Smartphones', 'Laptops', 'Fragrances'];

const ProductListScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.products) as Product[];
  const [index, setIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [screen, setScreen] = useState<'list' | 'detail'>();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]));
  };

  const filteredProducts = products.filter(product => 
    (index === 0 || product.category === categories[index]) &&
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderProducts = () => (
    <FlatList
      data={filteredProducts}
      keyExtractor={(item) => item.id.toString()}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.productList}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.productCard} onPress={() => { setSelectedProduct(item); setScreen('detail'); }}>
          <Image source={{ uri: item.thumbnail }} style={styles.image} />
          <View style={styles.details}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.price}>${item.price}</Text>
            <TouchableOpacity onPress={() => toggleFavorite(item.id)} style={styles.favoriteButton}>
              <Text style={{ color: favorites.includes(item.id) ? 'red' : 'gray' }}>❤️</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}
    />
  );

  return screen === 'detail' && selectedProduct ? (
    <ProductDetailScreen item={selectedProduct} onBack={() => setScreen('list')} />
  ) : (
    <View style={styles.container}>
      <TextInput 
        style={styles.searchBox}
        placeholder="Search products..."
        placeholderTextColor="#aaa"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <TabView
        navigationState={{ 
          index, 
          routes: categories.map((cat) => ({ key: cat.toLowerCase(), title: cat })) 
        }}
        renderScene={({ route }) => {
          switch (route.key) {
            case 'all':
              return renderProducts();
            case 'smartphones':
              return renderProducts();
            case 'laptops':
              return renderProducts();
            case 'fragrances':
              return renderProducts();
            default:
              return null;
          }
        }}
        onIndexChange={setIndex}
        renderTabBar={(props) => (
          <TabBar 
            {...props} 
            style={styles.tabBar} 
            indicatorStyle={{ backgroundColor: '#4682B4' }} 
            renderLabel={({ route, focused }: { route: { key: string; title: string }; focused: boolean }) => (
              <Text style={[styles.tabLabel, { color: focused ? '#4682B4' : '#333' }]}>
                {route.title}
              </Text>
            )}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 10,
  },
  searchBox: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  tabBar: {
    backgroundColor: '#4682B4',
    elevation: 2,
    marginBottom: 20,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    color: '#000'
  },
  tabLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  productList: {
    paddingBottom: 20,
    paddingHorizontal: 5,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  details: {
    marginLeft: 15,
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  price: {
    fontSize: 16,
    color: 'green',
  },
  favoriteButton: {
    marginTop: 5,
  },
  backButton: {
    marginBottom: 10,
  },
});

export default ProductListScreen;