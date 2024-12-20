import React, { useEffect, useState } from 'react'; 
import { View, Text } from 'react-native'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; 
 
const CartScreen = () => { 
  const [cartItems, setCartItems] = useState([]); 
 
  useEffect(() => { 
    const fetchCartItems = async () => { 
      const storedCart = await AsyncStorage.getItem('cart'); 
      if (storedCart) { 
        setCartItems(JSON.parse(storedCart)); 
      } 
    }; 
    fetchCartItems(); 
  }, []); 
 
  return ( 
    <View> 
      <Text>Корзина</Text> 
      {cartItems.map((item) => ( 
        <Text key={item.id}>{item.title} - {item.price} $</Text> 
      ))} 
    </View> 
  ); 
}; 
 
export default CartScreen;