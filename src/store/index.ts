import { configureStore } from '@reduxjs/toolkit';
import latestMoviesReducer from './slices/latestMoviesSlice';

export const store = configureStore({
  reducer: {
    latestMovies: latestMoviesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
