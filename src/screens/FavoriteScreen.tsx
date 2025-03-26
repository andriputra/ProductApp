import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { toggleFavorite } from '../redux/favoritesSlice';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const FavoritesScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const dispatch = useDispatch();

  const favoriteItems = useSelector((state: RootState) => {
    const allProducts = state.products?.products ?? []; 
    const favoriteIds = state.favorites?.items ?? [];
    return allProducts.filter(item => favoriteIds.includes(item.id));
  });

  const handleToggleFavorite = (id: number) => {
    dispatch(toggleFavorite(id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Favorites</Text>
      {favoriteItems.length > 0 ? (
        <FlatList
          data={favoriteItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.favoriteItem}>
              <Image source={{ uri: item.thumbnail }} style={styles.itemImage} />
              <View style={styles.itemDetails}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
              </View>
              <TouchableOpacity onPress={() => handleToggleFavorite(item.id)} style={styles.favoriteButton}>
                <FontAwesomeIcon icon={solidHeart} size={20} color="red" />
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <Text style={styles.emptyText}>No favorites yet.</Text>
      )}
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <FontAwesomeIcon icon={faArrowLeft} size={16} color="#333" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
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
  favoriteItem: {
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
    width: 60,
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
  favoriteButton: {
    padding: 10,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    marginTop: 20,
  },
  backButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  backText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default FavoritesScreen;