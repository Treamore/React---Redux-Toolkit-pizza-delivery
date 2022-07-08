import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterSliceState {
  category: number;
  sortID: number;
}

const initialState: FilterSliceState = {
  category: 0,
  sortID: 0,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<number>) => {
      state.category = action.payload;
    },
    setSortID: (state, action: PayloadAction<number>) => {
      state.sortID = action.payload;
    },
  },
});

export const { setCategory, setSortID } = filterSlice.actions;

export default filterSlice.reducer;
