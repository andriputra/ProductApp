import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/productSlice';
import { RootState, AppDispatch } from '../redux/store';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'ProductList'>;

const ProductListScreen = ({ navigation }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.products) as Array<{ id: number; title: string; price: number; thumbnail: string }>;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { item })}>
            <Image source={{ uri: item.thumbnail }} style={{ width: 100, height: 100 }} />
            <Text>{item.title}</Text>
            <Text>${item.price}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ProductListScreen;