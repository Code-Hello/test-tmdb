import { configureStore } from '@reduxjs/toolkit';
import latestMoviesReducer from './slices/latestMoviesSlice';
import movieReducer from './slices/movieSlice';
import moviesReducer from './slices/moviesSlice';

export const store = configureStore({
  reducer: {
    latestMovies: latestMoviesReducer,
    movies: moviesReducer,
    movie: movieReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
