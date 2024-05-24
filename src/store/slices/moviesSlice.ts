import {
  SerializedError,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import API from '../../config/api/instance';
import { ApiCallStatus } from '../../utils/apiCallStatus';
import { PaginatedRes } from '@/types/api';
import { Movies } from '@/types/movie';

export type MoviesState = {
  data: Movies;
  loading: boolean;
  status?: ApiCallStatus;
  error?: SerializedError;
};

const initialState: MoviesState = {
  data: [],
  loading: false,
  status: undefined,
  error: undefined,
};

export const getMovies = createAsyncThunk(
  'movies/getMovies',
  async ({ sortBy }: { sortBy?: string }) => {
    const urlPath = `/discover/movie${sortBy ? `?sort_by=${sortBy}` : ''}`;

    const { data } = await API.get<PaginatedRes<Movies>>(urlPath);
    return data.results;
  },
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMovies.pending, (state) => {
      state.status = ApiCallStatus.PENDING;
      state.loading = true;
    });

    builder.addCase(getMovies.fulfilled, (state, { payload }) => {
      state.status = ApiCallStatus.SUCCESS;
      state.data = payload;
      state.loading = false;
    });

    builder.addCase(getMovies.rejected, (state, { error }) => {
      state.status = ApiCallStatus.ERROR;
      state.error = error;
      state.loading = false;
    });
  },
});

export default moviesSlice.reducer;
