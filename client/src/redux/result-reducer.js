import { createSlice } from '@reduxjs/toolkit';

const resultReducer = createSlice({
  name: 'result',
  initialState: {
    answers: [],
    username: '',
  },
  reducers: {
    pushAnswer: (state, action) => {
      state.answers.push(action.payload);
    },
    updateAnswer: (state, action) => {
      const { ans, trace } = action.payload;
      state.answers.fill(ans, trace, trace + 1);
    },
    resetResult: state => ({
      answers: [],
    }),
  },
});

export const { pushAnswer, updateAnswer,resetResult } = resultReducer.actions;

export default resultReducer.reducer;
