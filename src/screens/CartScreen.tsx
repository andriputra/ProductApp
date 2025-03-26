import React from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const CartScreen = () => {
  const cart = useSelector((state: RootState) => state.cart as Array<{ id: string; name: string; price: number }>).map((item) => ({
    id: Number(item.id),
    title: item.name,
    price: item.price,
  }));

    function alert(message: string): void {
        console.log(message);
    }
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Shopping Cart</Text>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 10 }}>
            <Text>{item.title} - ${item.price}</Text>
          </View>
        )}
      />
      <Button title="Checkout" onPress={() => alert('Checkout process')} />
    </View>
  );
};

export default CartScreen;