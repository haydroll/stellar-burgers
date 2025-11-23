import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { orderBurgerApi, getOrderByNumberApi } from '@api';
import type { TOrder } from '@utils-types';

import { getErrorMessage } from '../utils/error';

import { clearConstructor } from './constructor';

export const createOrder = createAsyncThunk<TOrder, string[]>(
  'orders/createOrder',
  async (ingredientIds, { dispatch, rejectWithValue }) => {
    try {
      const { order } = await orderBurgerApi(ingredientIds);
      const { orders } = await getOrderByNumberApi(order.number);

      dispatch(clearConstructor());

      return orders[0];
    } catch (error) {
      const reason = getErrorMessage(error, 'Ошибка создания заказа');

      return rejectWithValue(reason);
    }
  }
);

type TOrdersState = {
  order: TOrder | null;
  isLoading: boolean;
  error: string | null;
  isModalOpen: boolean;
};

const initialState: TOrdersState = {
  order: null,
  isLoading: false,
  error: null,
  isModalOpen: false
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    openModal: (state) => {
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.order = null;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;

        state.isModalOpen = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;

        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Ошибка создания заказа';

        state.order = null;
      });
  }
});

export const { openModal, closeModal } = orderSlice.actions;

export default orderSlice.reducer;
