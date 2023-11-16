import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import selectedProductReducer from './slices/selectedProductSlice';
import favoriteProductListReducer from './slices/favoriteProductListSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'favoriteProductList',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(
  persistConfig,
  favoriteProductListReducer,
);

export const store = configureStore({
  reducer: {
    selectedProduct: selectedProductReducer,
    favoriteProductList: persistedReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
