import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, TextInput, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/productSlice';
import { RootState, AppDispatch } from '../redux/store';
import { TabView, TabBar } from 'react-native-tab-view';
import ProductDetailScreen from './ProductDetailScreen';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';

type Product = { id: number; title: string; category: string; thumbnail: string; price: number };

const ProductListScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.products) as Product[];
  const [index, setIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [screen, setScreen] = useState<'list' | 'detail'>();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [uniqueCategories, setUniqueCategories] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>(['All']);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (products.length > 0) {
      const fetchedCategories = Array.from(new Set(products.map(product => product.category)));
      setUniqueCategories(fetchedCategories);
      setCategories(['All', ...fetchedCategories]);
    }
  }, [products]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]));
  };

  const renderProducts = (filteredProducts: Product[]) => (
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
            <View style={styles.actionArea}>
              <TouchableOpacity onPress={() => toggleFavorite(item.id)} style={styles.favoriteButton}>
                <FontAwesomeIcon icon={favorites.includes(item.id) ? solidHeart : regularHeart} size={20} color={favorites.includes(item.id) ? 'red' : 'gray'} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.viewDetailButton} onPress={() => { setSelectedProduct(item); setScreen('detail'); }}>
                <Text style={styles.viewDetailText}>View Detail</Text>
              </TouchableOpacity>
            </View>
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
          routes: categories.map((cat) => ({ key: cat.toLowerCase(), title: cat.charAt(0).toUpperCase() + cat.slice(1) })) 
        }}
        renderScene={({ route }) => {
          const filteredProducts = products.filter(product => 
            (route.key === 'all' || product.category.toLowerCase() === route.key) &&
            product.title.toLowerCase().includes(searchQuery.toLowerCase())
          );

          return renderProducts(filteredProducts);
        }}
        onIndexChange={setIndex}
        renderTabBar={(props) => (
          <TabBar 
            {...props} 
            indicatorStyle={styles.indicator} 
            style={styles.tabBar} 
            activeColor="#4682B4" 
            inactiveColor="black" 
            scrollEnabled={true}
            labelStyle={styles.tabLabel}
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
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  categoryList: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  categoryItem: {
    fontSize: 14,
    color: '#555',
  },
  tabBar: {
    backgroundColor: 'white',
    elevation: 2,
    marginBottom: 10
  },
  indicator: {
    backgroundColor: '#4682B4',
  },
  tabLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  productList: {
    paddingBottom: 20,
    paddingHorizontal: 5,
  },
  actionArea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
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
  viewDetailButton: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: '#4682B4',
    borderRadius: 5,
    alignItems: 'center',
  },
  viewDetailText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  backButton: {
    marginBottom: 10,
  },
});

export default ProductListScreen;