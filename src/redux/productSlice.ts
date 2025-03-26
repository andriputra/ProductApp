import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Definisi tipe data untuk produk
interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

interface ProductState {
  products: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Thunk untuk mengambil data produk dari API
export const fetchProducts = createAsyncThunk<Product[], void, { rejectValue: string }>(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<{ products: Product[] }>('https://dummyjson.com/products');
      return response.data.products;
    } catch (error) {
      return rejectWithValue('Failed to fetch products');
    }
  }
);

const initialState: ProductState = {
  products: [],
  status: 'idle',
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Action manual untuk mengganti daftar produk
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
      state.status = 'succeeded';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? 'Something went wrong';
      });
  },
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;