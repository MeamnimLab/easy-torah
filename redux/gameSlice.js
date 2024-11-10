import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  game: {
    levelId: 1,
    numOfQuestions: 0,
    answeredData: [],
    finish: false,
    correctAnswersAmount: 0
  },
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    initLevelId: (state, action) => {
      state.game.levelId = action.payload;
    },
    initNumOfQuestions: (state, action) => {
      state.game.numOfQuestions = action.payload;
    },
    initAnswerdData: (state, action) => {
      state.game.answeredData = action.payload;
    },
    setAnswer: (state, action) => {
      state.game.answeredData[action.payload.gameIndex] = {
        state: action.payload.state ? "TRUE" : "FALSE",
        selectedAnswer: action.payload.selectedAnswer,
      };
      state.game.finish = !state.game.answeredData.some((item) => item.state === 'WAIT');
      if(action.payload.state === true) {
        state.game.correctAnswersAmount += 1;
      }
    },
    resetGame: (state) => {
      state.game = initialState
    }
  },
});

export const { initLevelId, initAnswerdData, initNumOfQuestions, setAnswer, resetGame } =
  gameSlice.actions;
export default gameSlice.reducer;
