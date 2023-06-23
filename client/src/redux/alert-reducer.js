import { createSlice } from '@reduxjs/toolkit';

const alertReducer = createSlice({
  name: 'alert',
  initialState: {
    open: false,
    message: '',
  },

  reducers: {
    showAlert: (state, action) => {
      state.open = true;
      state.message = action.payload;
    },
    hideAlert: (state, action) => {
      state.open = false;
      state.message = '';
    },
  },
});

export const { showAlert, hideAlert } = alertReducer.actions;

export default alertReducer.reducer;
