import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

interface CartSummaryProps {
  onCheckout: () => void; // Pastikan ini bertipe function yang tidak mengembalikan nilai
}

const CartSummary: React.FC<CartSummaryProps> = ({ onCheckout }) => {
  const cart = useSelector((state: RootState) => state.cart);
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.totalText}>Total: ${total.toFixed(2)}</Text>
      <Button title="Checkout" onPress={onCheckout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CartSummary;