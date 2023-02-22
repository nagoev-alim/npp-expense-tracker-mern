import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authService } from './api/authService.js';

const CONSTANTS = {
  register: 'auth/register',
  login: 'auth/login',
};

export const registerUser = createAsyncThunk(CONSTANTS.register, authService.register);
export const loginUser = createAsyncThunk(CONSTANTS.login, authService.login);

const initialState = {
  user: null,
  status: 'idle',
  error: false,
  message: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authStateReset: (state) => {
      state.status = 'idle';
      state.error = false;
      state.message = '';
    },
    logoutUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: builder => {
    builder
      // Register user
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.user = payload;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = true;
        state.message = payload;
        state.user = null;
      })
      // Login user
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.user = payload;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = true;
        state.message = payload;
      });
  },
});

export const { authStateReset, logoutUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
export const authSelect = {
  all: ({ auth }) => auth,
};
