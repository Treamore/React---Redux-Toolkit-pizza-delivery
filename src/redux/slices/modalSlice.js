import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modalVisibility: false,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModalVisibility: (state) => {
      state.modalVisibility = true;
    },
    modalVisibilityTimeout: (state) => {
      state.modalVisibility = false;
    },
  },
});

export const { setModalVisibility, modalVisibilityTimeout } = modalSlice.actions;

export default modalSlice.reducer;
