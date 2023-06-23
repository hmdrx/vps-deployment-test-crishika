import { createSlice } from '@reduxjs/toolkit';

const timerReducer = createSlice({
  name: 'timer',
  initialState: {
    hour: 0,
    minute: 0,
    second: 0,
  },
  reducers: {
    startTimer: (state, action) => {
      state.hour = action.payload.hour;
      state.minute = action.payload.minute;
      state.second = action.payload.second;
    },
    decreaseTimer: state => {
      // 00:10:00
      if (state.second > 0) state.second--;
      if (state.second === 0 && state.minute > 0) {
        state.minute--;
        state.second = 59;
      }
      if (state.minute === 0 && state.hour > 0) {
        state.hour--;
        state.minute = 59;
      }
    },
    resetTimer: state => {
      return {
        hour: 0,
        minute: 0,
        second: 0,
      };
    },
  },
});

export const { startTimer, decreaseTimer, resetTimer } = timerReducer.actions;

export default timerReducer.reducer;
