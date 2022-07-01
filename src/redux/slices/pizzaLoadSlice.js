import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchItems = createAsyncThunk(
  'pizzaLoad/fetchPizzas',
  async ({ categoryChosen, tagChosen, limit, page }) => {
    const response = await axios.get(
      `https://6294b3e6a7203b3ed06f152c.mockapi.io/items?${categoryChosen}&${tagChosen}&limit=${limit}&page=${page}`,
    );
    return response.data;
  },
);

export const fetchAllItems = createAsyncThunk('pizzaLoad/fetchAllPizzas', async () => {
  const response = await axios.get(`https://6294b3e6a7203b3ed06f152c.mockapi.io/items`);
  return response.data;
});

export const fetchById = createAsyncThunk('pizzaLoad/fetchById', async ({ id }) => {
  const response = await axios.get(`https://6294b3e6a7203b3ed06f152c.mockapi.io/items/${id}`);
  return response.data;
});

const initialState = {
  pizzaById: [],
  pizzas: [],
  allPizzas: [],
  status: 'loading',
  pageStatus: 'loading',
};

export const pizzaLoadSlice = createSlice({
  name: 'pizzaLoad',
  initialState,
  reducers: {
    clearArray: (state) => {
      state.pizzaById = [];
      state.pageStatus = 'loading';
    },
  },
  extraReducers: {
    [fetchItems.pending]: (state) => {
      state.status = 'loading';
      state.pizzas = [];
    },
    [fetchItems.fulfilled]: (state, action) => {
      state.status = 'sucsess';
      state.pizzas = action.payload;
    },
    [fetchItems.rejected]: (state) => {
      state.status = 'error';
      state.pizzas = [];
    },
    [fetchAllItems.fulfilled]: (state, action) => {
      state.allPizzas = action.payload;
    },
    [fetchById.pending]: (state) => {
      state.pizzaById = [];
      state.pageStatus = 'loading';
    },
    [fetchById.fulfilled]: (state, action) => {
      state.pizzaById = action.payload;
      state.pageStatus = 'sucsess';
    },
    [fetchById.error]: (state) => {
      state.pizzaById = [];
      state.pageStatus = 'error';
    },
  },
});

export const { clearArray } = pizzaLoadSlice.actions;

export default pizzaLoadSlice.reducer;
