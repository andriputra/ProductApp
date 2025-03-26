import React from 'react';
import { View, Text, Image, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'ProductDetail'>;

const ProductDetailScreen: React.FC<Props> = ({ route }) => {
  const { item } = route.params;

  return (
    <View>
      <Image source={{ uri: item.thumbnail }} style={{ width: '100%', height: 300 }} />
      <Text>{item.title}</Text>
      <Text>{item.description}</Text>
      <Text>${item.price}</Text>
    </View>
  );
};

export default ProductDetailScreen;