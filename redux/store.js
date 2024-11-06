import { configureStore } from '@reduxjs/toolkit';
import gamesReducer from './gamesSlice'

const store = configureStore({
  reducer: {
    games: gamesReducer,
  },
});

export default store;
