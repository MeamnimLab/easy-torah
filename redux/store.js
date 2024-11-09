import { configureStore } from '@reduxjs/toolkit';
import gamesReducer from './gamesSlice'
import levelsReducer from './levelsSlice'

const store = configureStore({
  reducer: {
    games: gamesReducer,
    levels: levelsReducer
  },
});

export default store;
