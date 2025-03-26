import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  ProductList: undefined;
  ProductDetail: { item: any };
  Cart: undefined;
};

export type ProductDetailScreenRouteProp = RouteProp<RootStackParamList, 'ProductDetail'>;