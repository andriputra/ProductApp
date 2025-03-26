import React, { useState, useEffect } from 'react';
import { View, Button, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ProductListScreen from '../screens/ProductListScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import CartScreen from '../screens/CartScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const AppNavigator = () => {
  const cartTotal = useSelector((state: RootState) => state.cart.totalQuantity);
  const favoriteTotal = useSelector((state: RootState) => state.favorites.totalFavorites);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [screen, setScreen] = useState<'ProductList' | 'ProductDetail' | 'Cart' | 'Favorites'>('ProductList');
  const [selectedProduct, setSelectedProduct] = useState<{ id: string; title: string; price: number; thumbnail: string } | null>(null);

  useEffect(() => {
    console.log("Cart updated:", cartItems);
  }, [cartItems]);

  const HeaderBar = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{screen === 'ProductList' ? 'Products App' : screen === 'ProductDetail' ? 'Product Detail' : 'Cart'}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => setScreen('Favorites')} style={styles.favoriteIcon}>
          <Text style={styles.favoriteText}>❤️ {favoriteTotal}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setScreen('Cart')} style={styles.cartIcon}>
          <Text style={styles.cartText}>🛒 {cartTotal}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <HeaderBar />
      {screen === 'ProductList' && (
        <ProductListScreen onNavigate={(product: { id: string; title: string; price: number; thumbnail: string }) => {
          setSelectedProduct(product);
          setScreen('ProductDetail');
        }} />
      )}
      {screen === 'ProductDetail' && (
        <ProductDetailScreen 
          product={selectedProduct} 
          onBack={() => setScreen('ProductList')} 
          onGoToCart={() => setScreen('Cart')} 
          cartTotal={cartTotal}
        />
      )}
      {screen === 'Cart' && (
        <CartScreen onBack={() => setScreen('ProductList')} />
      )}
      {screen === 'Favorites' && (
        <FavoriteScreen onBack={() => setScreen('ProductList')} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#4682B4',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  cartIcon: {
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  cartText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4682B4',
  },
  favoriteIcon: {
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
  },
  favoriteText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#D32F2F',
  },
});

export default AppNavigator;