import React from 'react';
import { View, Text, FlatList, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { updateCartQuantity, removeFromCart } from '../redux/cartSlice';

interface CartScreenProps {
  onBack: () => void;
}

const CartScreen: React.FC<CartScreenProps> = ({ onBack }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.items);
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const increaseQuantity = (id: number) => {
    dispatch(updateCartQuantity({ id, change: 1 }));
  };
  
  const decreaseQuantity = (id: number) => {
    dispatch(updateCartQuantity({ id, change: -1 }));
  };

  const deleteItem = (id: number) => {
    dispatch(removeFromCart(id));
  };

  function alert(message: string): void {
    console.log(message);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Shopping Cart</Text>
      {cart.length > 0 ? (
        <FlatList
          data={cart}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.cartItem}>
              <Image source={{ uri: item.thumbnail }} style={styles.itemImage} />
              <View style={styles.itemDetails}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemPrice}>Price: ${item.price.toFixed(2)}</Text>
                <Text style={styles.itemTotal}>Total: ${(item.price * item.quantity).toFixed(2)}</Text>
                <View style={styles.action}>
                <View style={styles.quantityContainer}>
                    <TouchableOpacity style={styles.quantityButton} onPress={() => decreaseQuantity(item.id)}>
                      <Text style={styles.buttonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.itemQuantity}>{item.quantity}</Text>
                    <TouchableOpacity style={styles.quantityButton} onPress={() => increaseQuantity(item.id)}>
                      <Text style={styles.buttonText}>+</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity style={styles.deleteButton} onPress={() => deleteItem(item.id)}>
                    <Text style={styles.deleteText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
      ) : (
        <Text style={styles.emptyCart}>Your cart is empty.</Text>
      )}
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: ${totalAmount.toFixed(2)}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Back" onPress={onBack} color="#888" />
        <Button title="Checkout" onPress={() => alert('Checkout process')} color="#4682B4" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  itemImage: {
    width: 120,
    height: 60,
    borderRadius: 5,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 16,
    color: 'green',
  },
  itemTotal: {
    fontSize: 16,
    color: 'blue',
  },
  itemQuantity: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    width: 50,
    height: 30,
    textAlign: 'center',
    borderRadius: 5,
  },
  emptyCart: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  totalContainer: {
    marginTop: 10,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  quantityButton: {
    backgroundColor: '#ddd',
    paddingTop: 3,
    paddingBottom: 3, 
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 18,
  },
  deleteButton: {
    marginTop: 10,
    backgroundColor: '#ff4d4d',
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  deleteText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  action:{
    flexDirection: 'row',
    justifyContent:'space-between',
  }
});

export default CartScreen;