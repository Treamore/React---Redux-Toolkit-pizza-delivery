import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  category: 0,
  sortID: 0,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setSortID: (state, action) => {
      state.sortID = action.payload;
    },
  },
});

export const { setCategory, setSortID } = filterSlice.actions;

export default filterSlice.reducer;
