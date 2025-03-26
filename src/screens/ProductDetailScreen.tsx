import React from 'react';
import { View, Text, Image, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

import { RouteProp } from '@react-navigation/native';

type ProductDetailScreenRouteProp = RouteProp<{ params: { item: { thumbnail: string; title: string; description: string; price: number } } }, 'params'>;

const ProductDetailScreen = ({ route }: { route: ProductDetailScreenRouteProp }) => {
  const dispatch = useDispatch();
  const { item } = route.params;

  return (
    <View style={{ padding: 20 }}>
      <Image source={{ uri: item.thumbnail }} style={{ width: '100%', height: 300 }} />
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{item.title}</Text>
      <Text>{item.description}</Text>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>${item.price}</Text>
      <Button title="Add to Cart" onPress={() => dispatch(addToCart(item))} />
    </View>
  );
};

export default ProductDetailScreen;