import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigation from './TabNavigation';
import ProductDetailsScreen from '../../screens/ProductDetailsScreen';
import { RootStackParams } from './types';
import CustomHeader from '../../components/CustomHeader';

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
          options={{
            headerShown: true,
            header: props => <CustomHeader {...props} />,
          }}
          component={ProductDetailsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationService;
