import React from 'react';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import NavigationService from './src/services/navigation/NavigationService';
import { persistor, store } from './src/services/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationService />
      </PersistGate>
    </Provider>
  );
};

export default App;
