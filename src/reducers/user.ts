import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {
  registerUserApi,
  loginUserApi,
  getUserApi,
  updateUserApi,
  logoutApi,
  type TRegisterData,
  type TLoginData
} from '@api';
import type { TUser } from '@utils-types';

import { getErrorMessage } from '../utils/error';

export const registerUser = createAsyncThunk(
  'user/register',
  async (data: TRegisterData, { rejectWithValue }) => {
    try {
      const { user } = await registerUserApi(data);

      return user;
    } catch (error) {
      const reason = getErrorMessage(error, 'Ошибка регистрации');

      return rejectWithValue(reason);
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (data: TLoginData, { rejectWithValue }) => {
    try {
      const { user } = await loginUserApi(data);

      return user;
    } catch (error) {
      const reason = getErrorMessage(error, 'Ошибка авторизации');

      return rejectWithValue(reason);
    }
  }
);

export const getUser = createAsyncThunk(
  'user/getUser',
  async (_, { rejectWithValue }) => {
    try {
      const { user } = await getUserApi();

      return user;
    } catch (error) {
      const reason = getErrorMessage(error, 'Ошибка загрузки пользователя');

      return rejectWithValue(reason);
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (data: Partial<TRegisterData>, { rejectWithValue }) => {
    try {
      const { user } = await updateUserApi(data);

      return user;
    } catch (error) {
      const reason = getErrorMessage(error, 'Ошибка обновления пользователя');

      return rejectWithValue(reason);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();

      return true;
    } catch (error) {
      const reason = getErrorMessage(error, 'Ошибка выхода');

      return rejectWithValue(reason);
    }
  }
);

export type TUserState = {
  user: TUser | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: TUserState = {
  user: null,
  isLoading: true,
  error: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;

        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;

        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;

        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Ошибка загрузки пользователя';

        state.user = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      });
  }
});

export default userSlice.reducer;
