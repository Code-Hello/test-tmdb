import {
  SerializedError,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import API from '../../config/api/instance';
import { ApiCallStatus } from '../../utils/apiCallStatus';
import { Movie } from '@/types/movie';

export type MovieState = {
  data?: Movie;
  loading: boolean;
  status?: ApiCallStatus;
  error?: SerializedError;
};

const initialState: MovieState = {
  data: undefined,
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
  },
});

export default movieSlice.reducer;
