import { createSlice } from '@reduxjs/toolkit';

const authReducer = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token') || '',
  },
  reducers: {
    login: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
      // state.token = action.payload
    },
    logout: state => {
      localStorage.removeItem('token');
      state.token = '';
    },
  },
});

export default authReducer.reducer;
export const { login, logout } = authReducer.actions;
