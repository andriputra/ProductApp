import React, { useState } from 'react';
import { View, Button, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ProductListScreen from '../screens/ProductListScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import CartScreen from '../screens/CartScreen';

const AppNavigator = () => {
  const [screen, setScreen] = useState<'ProductList' | 'ProductDetail' | 'Cart'>('ProductList');
  const [selectedProduct, setSelectedProduct] = useState<{ id: string; title: string; price: number; thumbnail: string } | null>(null);
  const [cartCount, setCartCount] = useState(0);

  const HeaderBar = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{screen === 'ProductList' ? 'Products App' : screen === 'ProductDetail' ? 'Product Detail' : 'Cart'}</Text>
      <TouchableOpacity onPress={() => setScreen('Cart')} style={styles.cartIcon}>
        <Text style={styles.cartText}>🛒 {cartCount}</Text>
      </TouchableOpacity>
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
          setCartCount={setCartCount} 
        />
      )}
      {screen === 'Cart' && (
        <CartScreen onBack={() => setScreen('ProductList')} />
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
});

export default AppNavigator;