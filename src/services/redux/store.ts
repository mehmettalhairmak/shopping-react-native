import { configureStore } from '@reduxjs/toolkit';
import selectedProductReducer from './slices/selectedProductSlice';
import favoriteProductListReducer from './slices/favoriteProductListSlice';

export const store = configureStore({
  reducer: {
    selectedProduct: selectedProductReducer,
    favoriteProductList: favoriteProductListReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
