import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoriteState {
  items: number[];
  totalFavorites: number;
}

const initialState: FavoriteState = {
  items: [],
  totalFavorites: 0,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<number>) => {
      if (state.items.includes(action.payload)) {
        state.items = state.items.filter(id => id !== action.payload);
        state.totalFavorites -= 1;
      } else {
        state.items.push(action.payload);
        state.totalFavorites += 1;
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;