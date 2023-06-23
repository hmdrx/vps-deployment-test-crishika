import { createSlice } from '@reduxjs/toolkit';

const performanceDataReducer = createSlice({
  name: 'performanceData',
  initialState: [
    // {
    //   id: 0,
    //   sub: '',
    //   to_ques: 0,
    //   co_ans: 0,
    //   wo_ans: 0,
    //   un_ans: 0,
    // },
    // {
    //   id: 2,
    //   sub: 'Pathology',
    //   to_ques: 320,
    //   co_ans: 120,
    //   wo_ans: 98,
    //   un_ans: 102,
    // },
  ],

  reducers: {
    performanceInfo: (state, action) => {
      if (state.find(el => el.id === action.payload.id)) {
        const index = state.findIndex(el => el.id === action.payload.id);

        state[index].to_ques = state[index].to_ques + action.payload.to_ques;
        state[index].co_ans = state[index].co_ans + action.payload.co_ans;
        state[index].un_ans = state[index].un_ans + action.payload.un_ans;
        state[index].wo_ans = state[index].wo_ans + action.payload.wo_ans;
        return;
      }

      return [
        ...state,
        {
          id: action.payload.id,
          sub: action.payload.sub,
          to_ques: action.payload.to_ques,
          co_ans: action.payload.co_ans,
          wo_ans: action.payload.wo_ans,
          un_ans: action.payload.un_ans,
        },
      ];
    },
  },
});

export const { performanceInfo } = performanceDataReducer.actions;

export default performanceDataReducer.reducer;
