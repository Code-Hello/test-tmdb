import {
  SerializedError,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import { sub } from 'date-fns';
import { format } from 'date-fns/format';
import API from '../../config/api/instance';
import { ApiCallStatus } from '../../utils/apiCallStatus';
import { PaginatedRes } from '@/types/api';
import { Movies } from '@/types/movie';
import { LatestMoviesPeriod } from '@/utils/latestMoviesPeriod';

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

export const getLatestMovies = createAsyncThunk(
  'movies/getLatestMovies',
  async (period?: LatestMoviesPeriod) => {
    const currentdDate = new Date();
    const previousDate: Record<LatestMoviesPeriod, Date> = {
      DAY: sub(currentdDate, { days: 1 }),
      WEEK: sub(currentdDate, { days: 7 }),
      MONTH: sub(currentdDate, { months: 1 }),
    };

    const urlPath = `/discover/movie?primary_release_date.gte=${format(previousDate[period ?? LatestMoviesPeriod.WEEK], 'yyyy-MM-dd')}&primary_release_date.lte=${format(currentdDate, 'yyyy-MM-dd')}&sort_by=primary_release_date.desc`;

    const { data } = await API.get<PaginatedRes<Movies>>(urlPath);

    // Slicing result because no limit available on api call
    return data.results.slice(0, 5);
  },
);

const latestMoviesSlice = createSlice({
  name: 'latestMovies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLatestMovies.pending, (state) => {
      state.status = ApiCallStatus.PENDING;
      state.loading = true;
    });

    builder.addCase(getLatestMovies.fulfilled, (state, { payload }) => {
      state.status = ApiCallStatus.SUCCESS;
      state.data = payload;
      state.loading = false;
    });

    builder.addCase(getLatestMovies.rejected, (state, { error }) => {
      state.status = ApiCallStatus.ERROR;
      state.error = error;
      state.loading = false;
    });
  },
});

export default latestMoviesSlice.reducer;
