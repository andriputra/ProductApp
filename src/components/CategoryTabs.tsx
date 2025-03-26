import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const categories = ['All', 'Smartphones', 'Laptops', 'Fragrances', 'Skincare'];

const CategoryTabs = ({ selectedCategory, onSelectCategory }: { selectedCategory: string; onSelectCategory: (category: string) => void }) => {
  return (
    <View style={styles.container}>
      {categories.map((category) => (
        <TouchableOpacity
          key={category}
          style={[styles.tab, selectedCategory === category && styles.selectedTab]}
          onPress={() => onSelectCategory(category)}
        >
          <Text style={styles.tabText}>{category}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  tab: {
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: '#ddd',
  },
  selectedTab: {
    backgroundColor: '#007bff',
  },
  tabText: {
    color: 'white',
  },
});

export default CategoryTabs;