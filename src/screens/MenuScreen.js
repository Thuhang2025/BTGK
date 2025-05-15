import React, { useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useMyContextController } from '../store';

const dishesData = {
  Chinese: [
    { id: '1', name: 'Noodles', price: 100, image: require('../assets/chinese.png') },
  ],
  'South Indian': [
    { id: '2', name: 'Dosa', price: 80, image: require('../assets/south-indian.png') },
  ],
  Beverages: [
    { id: '3', name: 'Juice', price: 50, image: require('../assets/beverages.png') },
  ],
  'North Indian': [
    { id: '4', name: 'Biryani', price: 120, image: require('../assets/biryani.png') },
  ],
};

const MenuScreen = ({ route }) => {
  const { category } = route.params;
  const { dispatch } = useMyContextController();
  const dishes = dishesData[category] || [];

  useEffect(() => {
    dispatch({ type: 'SET_DISHES', payload: dishes });
  }, [category]);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>${item.price}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => dispatch({ type: 'ADD_TO_CART', payload: item })}
        >
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{category} Menu</Text>
      <FlatList
        data={dishes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  item: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  details: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: '500',
  },
  price: {
    fontSize: 16,
    color: '#666',
    marginVertical: 5,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 8,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default MenuScreen; 