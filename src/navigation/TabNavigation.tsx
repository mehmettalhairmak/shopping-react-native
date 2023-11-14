import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProductListScreen from '../screen/ProductListScreen';
import FavoritesListScreen from '../screen/FavoritesListScreen';
import { BottomTabParams } from './types';

const Tab = createBottomTabNavigator<BottomTabParams>();

const TabNavigation = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="ProductListScreen" component={ProductListScreen} />
      <Tab.Screen name="FavoritesListScreen" component={FavoritesListScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
