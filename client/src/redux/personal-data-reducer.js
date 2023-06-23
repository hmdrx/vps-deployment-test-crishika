import { createSlice } from '@reduxjs/toolkit';

const personalDataReducer = createSlice({
  name: 'personalData',
  initialState: {
    name: '',
    email: '',
    mobile: '',
    degree: '',
    status: '',
    college: '',
  },
  reducers: {
    personalInfo: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { personalInfo } = personalDataReducer.actions;

export default personalDataReducer.reducer;
