// import React from 'react';
// import { View, Text, FlatList, Button } from 'react-native';
// import { useSelector } from 'react-redux';
// import { RootState } from '../redux/store';

// interface CartScreenProps {
//   onBack: () => void;
// }

// const CartScreen: React.FC<CartScreenProps> = ({ onBack }) => {
//   const cart = useSelector((state: RootState) => state.cart as Array<{ id: string; name: string; price: number }>).map((item) => ({
//     id: Number(item.id),
//     title: item.name,
//     price: item.price,
//   }));

//   function alert(message: string): void {
//     console.log(message);
//   }

//   return (
//     <View style={{ padding: 20 }}>
//       <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Shopping Cart</Text>
//       <FlatList
//         data={cart}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <View style={{ marginVertical: 10 }}>
//             <Text>{item.title} - ${item.price}</Text>
//           </View>
//         )}
//       />
//       <Button title="Checkout" onPress={() => alert('Checkout process')} />
//       <Button title="Back" onPress={onBack} />
//     </View>
//   );
// };

// export default CartScreen;

import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

// Dummy data untuk produk berdasarkan kategori
const products = {
  'Category A': ['Product A', 'Product B', 'Product C', 'Product D', 'Product E', 'Product F'],
  'Category B': ['Product G', 'Product H', 'Product I'],
  'Category C': ['Product J', 'Product K'],
  'Category D': ['Product L', 'Product M', 'Product N', 'Product O'],
};

// Komponen untuk menampilkan daftar produk dalam kategori
const ProductList = ({ category }: { category: keyof typeof products }) => (
  <FlatList
    data={products[category]}
    keyExtractor={(item) => item}
    renderItem={({ item }) => (
      <View style={styles.productItem}>
        <Text style={styles.productText}>{item}</Text>
      </View>
    )}
  />
);

// Membuat SceneMap untuk setiap kategori
const renderScene = SceneMap({
  categoryA: () => <ProductList category="Category A" />,
  categoryB: () => <ProductList category="Category B" />,
  categoryC: () => <ProductList category="Category C" />,
  categoryD: () => <ProductList category="Category D" />,
});

const App = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'categoryA', title: 'Category A' },
    { key: 'categoryB', title: 'Category B' },
    { key: 'categoryC', title: 'Category C' },
    { key: 'categoryD', title: 'Category D' },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          indicatorStyle={styles.indicator}
          style={styles.tabBar}
          activeColor="#4682B4"
          inactiveColor="black"
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'white',
    elevation: 2,
  },
  indicator: {
    backgroundColor: '#4682B4',
  },
  productItem: {
    backgroundColor: '#e0e0e0',
    padding: 20,
    marginVertical: 5,
    marginHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  productText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;