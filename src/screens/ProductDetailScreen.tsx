import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions, TextInput } from 'react-native';

const { width, height } = Dimensions.get('window');

type Product = {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
};

const ProductDetailScreen = ({ item, onBack, setCartCount }: { item: Product; onBack: () => void; setCartCount?: React.Dispatch<React.SetStateAction<number>> }) => {
  const [quantity, setQuantity] = useState(1);

  const addToCart = () => {
    if (setCartCount) {
      setCartCount(prev => prev + quantity); // Increment cart count
      alert(`Added ${quantity} ${item.title} to cart`);
    } else {
      console.error("setCartCount is undefined");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.thumbnail }} style={styles.image} />
      <View style={styles.card}>
        <ScrollView>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity style={styles.quantityButton} onPress={() => setQuantity(prev => Math.max(1, prev - 1))}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <TextInput 
              style={styles.input} 
              keyboardType="numeric" 
              value={String(quantity)} 
              onChangeText={(text) => setQuantity(Number(text) || 1)} 
            />
            <TouchableOpacity style={styles.quantityButton} onPress={() => setQuantity(prev => prev + 1)}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cartButton} onPress={addToCart}>
            <Text style={styles.cartText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  image: {
    width: width - 20,
    height: height * 0.4,
    resizeMode: 'cover',
    borderRadius: 10,
    alignSelf: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 15,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginRight: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    width: 50,
    height: 45,
    textAlign: 'center',
    borderRadius: 5,
  },
  quantityButton: {
    backgroundColor: '#ddd',
    paddingTop: 10,
    paddingBottom: 10, 
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  backButton: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
    marginRight: 5,
  },
  backText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartButton: {
    backgroundColor: '#4682B4',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
    marginLeft: 5,
  },
  cartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductDetailScreen;
function alert(message: string) {
  console.log(`Alert: ${message}`);
}
