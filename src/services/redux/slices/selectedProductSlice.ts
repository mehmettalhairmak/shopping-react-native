import { Product as ProductModel } from '../../../models/ProductModel';
import { RootState } from '../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  selectedProduct: {} as ProductModel,
};

export const selectedProductSlice = createSlice({
  name: 'selectedProduct',
  initialState,
  reducers: {
    setSelectedProduct: (state, action: PayloadAction<ProductModel>) =>
      void (state.selectedProduct = action.payload),
  },
});

export const { setSelectedProduct } = selectedProductSlice.actions;
export const selectSelectedProduct = (state: RootState) =>
  state.selectedProduct;

export default selectedProductSlice.reducer;
