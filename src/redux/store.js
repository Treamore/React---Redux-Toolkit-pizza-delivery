import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filterSlice';
import search from './slices/searchSlice';
import cart from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    filter,
    search,
    cart,
  },
});
