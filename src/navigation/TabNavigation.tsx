import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProductListScreen from '../screens/ProductListScreen';
import FavoritesListScreen from '../screens/FavoritesListScreen';
import { BottomTabParams } from './types';
import CustomTabBar from '../components/CustomTabBar';

const Tab = createBottomTabNavigator<BottomTabParams>();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
      initialRouteName="ProductListScreen">
      <Tab.Screen name="ProductListScreen" component={ProductListScreen} />
      <Tab.Screen name="FavoritesListScreen" component={FavoritesListScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
