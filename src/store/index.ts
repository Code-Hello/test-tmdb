import { configureStore } from '@reduxjs/toolkit';
import latestMoviesReducer from './slices/latestMoviesSlice';
import moviesReducer from './slices/moviesSlice';

export const store = configureStore({
  reducer: {
    latestMovies: latestMoviesReducer,
    movies: moviesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
