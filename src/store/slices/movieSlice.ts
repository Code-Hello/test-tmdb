import {
  SerializedError,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import API from '../../config/api/instance';
import { ApiCallStatus } from '../../utils/apiCallStatus';
import { PaginatedRes } from '@/types/api';
import { Movie, Movies } from '@/types/movie';

export type MovieState = {
  data?: Movie;
  recommendations: Movies;
  loading: boolean;
  status?: ApiCallStatus;
  error?: SerializedError;
};

const initialState: MovieState = {
  data: undefined,
  recommendations: [],
  loading: false,
  status: undefined,
  error: undefined,
};

export const getMovie = createAsyncThunk(
  'movie/getMovie',
  async (movieId: string) => {
    const { data } = await API.get<Movie>(`/movie/${movieId}`);
    return data;
  },
);

export const getMovieRecommendations = createAsyncThunk(
  'movie/getMovieRecommendations',
  async (movieId: string) => {
    const { data } = await API.get<PaginatedRes<Movies>>(
      `/movie/${movieId}/recommendations`,
    );
    return data.results.slice(0, 5);
  },
);

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMovie.pending, (state) => {
      state.status = ApiCallStatus.PENDING;
      state.loading = true;
    });

    builder.addCase(getMovie.fulfilled, (state, { payload }) => {
      state.status = ApiCallStatus.SUCCESS;
      state.data = payload;
      state.loading = false;
    });

    builder.addCase(getMovie.rejected, (state, { error }) => {
      state.status = ApiCallStatus.ERROR;
      state.error = error;
      state.loading = false;
    });

    builder.addCase(getMovieRecommendations.fulfilled, (state, { payload }) => {
      state.recommendations = payload;
    });
  },
});

export default movieSlice.reducer;
