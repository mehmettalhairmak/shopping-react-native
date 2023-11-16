import React from 'react';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import NavigationService from './src/services/navigation/NavigationService';
import { store } from './src/services/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationService />
    </Provider>
  );
};

export default App;
