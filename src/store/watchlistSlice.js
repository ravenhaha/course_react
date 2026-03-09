import { createSlice } from '@reduxjs/toolkit';

const loadFromStorage = () => {
  try {
    const data = localStorage.getItem('watchlist');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState: loadFromStorage(),
  reducers: {
    addToWatchlist: (state, action) => {
      const exists = state.find((m) => m.id === action.payload.id);
      if (!exists) {
        state.push(action.payload);
        localStorage.setItem('watchlist', JSON.stringify(state));
      }
    },
    removeFromWatchlist: (state, action) => {
      const next = state.filter((m) => m.id !== action.payload);
      localStorage.setItem('watchlist', JSON.stringify(next));
      return next;
    },
  },
});

export const { addToWatchlist, removeFromWatchlist } = watchlistSlice.actions;
export default watchlistSlice.reducer;
