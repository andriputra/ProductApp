import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get<{ products: any[] }>('https://dummyjson.com/products');
  return response.data.products;
});

interface ProductState {
  products: any[];
  status: string;
}

const initialState: ProductState = {
  products: [],
  status: 'idle',
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
      state.status = 'succeeded';
    });
  },
});

export default productSlice.reducer;