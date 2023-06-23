import { createSlice } from '@reduxjs/toolkit';

const questionReducer = createSlice({
  name: 'questions',
  initialState: {
    id: 0,
    sub: '',
    questions: [],
    options: [],
    correct_answers: [],
    trace: 0,
    time: null,
  },
  reducers: {
    startExam: (state, action) => {
      return {
        ...state,
        id: action.payload.id,
        sub: action.payload.sub,
        questions: action.payload.questions,
        options: action.payload.options
      };
    },
    nextQues: state => {
      return {
        ...state,
        trace: state.trace + 1,
      };
    },
    prevQues: state => {
      return {
        ...state,
        trace: state.trace - 1,
      };
    },
    options: (state, action) => {
      return {
        ...state,
        options: action.payload,
      };
    },
    resetExam: (state) => {
      return {
        questions: [],
        options: [],
        correct_answers: [],
        trace: 0,
        time: null,
      };
    },
  },
});

export const { startExam, nextQues, prevQues, resetExam } =
  questionReducer.actions;

export default questionReducer.reducer;
