import { configureStore } from '@reduxjs/toolkit';
import watchlistReducer from './watchlistSlice';
import profileReducer from './profileSlice';

export const store = configureStore({
  reducer: {
    watchlist: watchlistReducer,
    profile: profileReducer,
  },
});
