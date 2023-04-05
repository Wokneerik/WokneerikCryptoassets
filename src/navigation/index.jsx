import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AddNewAssetScreen from '../screens/AddNewAssetScreen';
import CoinDetailsScreen from '../screens/CoinDetailsScreen';
import BottomTabNavigator from './BottomTabNavigator';


const Stack = createNativeStackNavigator()

const Navigation = () => {
  return (
    <Stack.Navigator
      initialRouteName='Root'
    >
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="CoinDetailsScreen" component={CoinDetailsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="AddNewAssetScreen" component={AddNewAssetScreen} options={{
        title: "Add New Asset",
        headerStyle: {
          backgroundColor: '#121212'
        },
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: 'bold'
        }
      }} />
    </Stack.Navigator>
  )
}

export default Navigation