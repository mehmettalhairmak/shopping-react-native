import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigation from './TabNavigation';
import ProductDetailsScreen from '../screen/ProductDetailsScreen';
import { RootStackParams } from './types';

const Stack = createNativeStackNavigator<RootStackParams>();

const NavigationService = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="TabNavigation">
        <Stack.Screen name="TabNavigation" component={TabNavigation} />
        <Stack.Screen
          name="ProductDetailsScreen"
          component={ProductDetailsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationService;
