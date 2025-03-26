import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: Array<{ id: string; name: string; price: number }> = [],
  reducers: {
    addToCart: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;