import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getFeedsApi } from '@api';
import type { TOrdersData } from '@utils-types';

export const fetchFeed = createAsyncThunk<TOrdersData>(
  'feed/fetchFeed',
  getFeedsApi
);

type TFeedState = TOrdersData & {
  isLoading: boolean;
  error: string | null;
};

const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: null
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.isLoading = false;

        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(fetchFeed.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Ошибка загрузки ленты';
      });
  }
});

export default feedSlice.reducer;
