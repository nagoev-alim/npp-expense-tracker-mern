import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';

import { transactionsService } from './api/transactionsService.js';

const calculate = (payload) => {
  const amounts = payload.map(({ price }) => price);
  const total = amounts
    .reduce((acc, item) => (acc + item), 0)
    .toFixed(2);
  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc + item), 0)
    .toFixed(2);
  const expense = (amounts.filter(item => item < 0)
    .reduce((acc, item) => (acc + item), 0) * -1)
    .toFixed(2);
  return {
    total,
    income,
    expense,
  };
};

const CONSTANTS = {
  get: 'transactions/get',
  create: 'transactions/create',
  update: 'transactions/update',
  delete: 'transactions/delete',
};

export const getTransactions = createAsyncThunk(CONSTANTS.get, transactionsService.get);
export const createTransaction = createAsyncThunk(CONSTANTS.create, transactionsService.create);
export const updateTransaction = createAsyncThunk(CONSTANTS.update, transactionsService.update);
export const deleteTransaction = createAsyncThunk(CONSTANTS.delete, transactionsService.delete);

const initialState = {
  items: [],
  expense: 0,
  income: 0,
  total: 0,
  status: 'idle',
  error: false,
  message: '',
  editStatus: {
    isEditable: false,
    item: null,
  },
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    resetTransactionState: () => initialState,
    setEditStatus: (state, { payload }) => {
      state.editStatus = payload;
    },
  },
  extraReducers: builder => {
    builder
      // Get transactions
      .addCase(getTransactions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getTransactions.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.items = payload;
        state.expense = calculate(payload).expense;
        state.income = calculate(payload).income;
        state.total = calculate(payload).total;
      })
      .addCase(getTransactions.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = true;
        state.message = payload;
      })
      // Create transaction
      .addCase(createTransaction.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createTransaction.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.items.push(payload);
        state.expense = calculate(state.items).expense;
        state.income = calculate(state.items).income;
        state.total = calculate(state.items).total;
      })
      .addCase(createTransaction.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = true;
        state.message = payload;
      })
      // Update transaction
      .addCase(updateTransaction.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateTransaction.fulfilled, (state, { payload }) => {
        state.status = 'success';
        const index = state.items.findIndex(transaction => transaction._id === payload._id);
        const newArray = [...state.items];
        newArray[index].title = payload.title;
        newArray[index].price = payload.price;
        newArray[index].date = payload.date;
        state.items = newArray;
        state.expense = calculate(newArray).expense;
        state.income = calculate(newArray).income;
        state.total = calculate(newArray).total;
      })
      .addCase(updateTransaction.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = true;
        state.message = payload;
      })
      // Delete transaction
      .addCase(deleteTransaction.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteTransaction.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.items = state.items.filter(transaction => transaction._id !== payload);
        state.expense = calculate(state.items).expense;
        state.income = calculate(state.items).income;
        state.total = calculate(state.items).total;
      })
      .addCase(deleteTransaction.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = true;
        state.message = payload;
      });
  },
});

export const { resetTransactionState, setEditStatus } = transactionsSlice.actions;
export const transactionsReducer = transactionsSlice.reducer;
export const transactionsSelect = {
  all: ({ transactions }) => transactions,
};


