import {
  createSlice,
  createAsyncThunk,
  type PayloadAction
} from '@reduxjs/toolkit';

import type { TOrder, TOrdersData } from '@utils-types';
import { getOrdersApi } from '@api';

import { getErrorMessage } from '../utils/error';

export const fetchProfileOrders = createAsyncThunk<
  TOrdersData,
  void,
  { rejectValue: string }
>('profileOrders/fetch', async (_, { rejectWithValue }) => {
  try {
    const orders = await getOrdersApi();

    const today = new Date().toISOString().split('T')[0];
    const totalToday = orders.reduce(
      (count, order) => count + (order.createdAt === today ? 1 : 0),
      0
    );

    return {
      orders,
      total: orders.length,
      totalToday
    };
  } catch (error) {
    const reason = getErrorMessage(error, 'Ошибка загрузки заказов');

    return rejectWithValue(reason);
  }
});

export type TProfileOrdersState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
  error: string | null;
};

const initialState: TProfileOrdersState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: null
};

export const profileOrdersSlice = createSlice({
  name: 'profileOrders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchProfileOrders.fulfilled,
        (state, action: PayloadAction<TOrdersData>) => {
          state.isLoading = false;

          state.orders = action.payload.orders;
          state.total = action.payload.total;
          state.totalToday = action.payload.totalToday;
        }
      )
      .addCase(fetchProfileOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Ошибка загрузки заказов';
      });
  }
});

export default profileOrdersSlice.reducer;
