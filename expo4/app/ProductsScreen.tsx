import React, { useEffect, useState } from 'react'; 
import { View, FlatList, Text, Image, Button } from 'react-native'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

 
const ProductsScreen = () => { 
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true); 
 
  useEffect(() => { 
    const fetchProducts = async () => { 
      const response = await fetch('https://fakestoreapi.com/products'); 
      const data = await response.json(); 
      setProducts(data); 
      setLoading(false); 
    }; 
    fetchProducts(); 
  }, []); 
 
  const addToCart = async (product) => { 
    try { 
      const existingCart = await AsyncStorage.getItem('cart'); 
      const cart = existingCart ? JSON.parse(existingCart) : []; 
      cart.push(product); 
      await AsyncStorage.setItem('cart', JSON.stringify(cart)); 
    } catch (error) { 
      console.error(error); 
    } 
  }; 
 
  if (loading) { 
    return <Text>Загрузка...</Text>; 
  } 
 
  return ( 
    <FlatList 
      data={products} 
      keyExtractor={(item) => item.id.toString()} 
      renderItem={({ item }) => ( 
        <View> 
          <Image source={{ uri: item.image }} style={{ width: 100, height: 100 }} /> 
          <Text>{item.title}</Text> 
          <Text>{item.price} $</Text> 
          <Text>{item.description}</Text> 
          <Button title="Добавить в корзину" onPress={() => addToCart(item)} /> 
        </View> 
      )} 
    /> 
  ); 
}; 
 
export default ProductsScreen;