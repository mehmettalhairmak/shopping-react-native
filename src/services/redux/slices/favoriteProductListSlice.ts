import { Product as ProductModel } from '../../../models/ProductModel';
import { RootState } from '../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  favoriteProductList: [] as ProductModel[],
};

export const favoriteProductListSlice = createSlice({
  name: 'favoriteProductList',
  initialState,
  reducers: {
    addFavoriteProduct: (state, action: PayloadAction<ProductModel>) =>
      void (state.favoriteProductList = [
        ...state.favoriteProductList,
        action.payload,
      ]),
    removeFavoriteProduct: (state, action: PayloadAction<ProductModel>) =>
      void (state.favoriteProductList = [
        ...state.favoriteProductList.filter(
          product => product.id !== action.payload.id,
        ),
      ]),
  },
});

export const { addFavoriteProduct, removeFavoriteProduct } =
  favoriteProductListSlice.actions;
export const selectFavoriteProductList = (state: RootState) =>
  state.favoriteProductList;

export default favoriteProductListSlice.reducer;
