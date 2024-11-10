import { configureStore } from '@reduxjs/toolkit';
import levelsReducer from './levelsSlice'
import gameReducer from './gameSlice'

const store = configureStore({
  reducer: {
    levels: levelsReducer,
    game: gameReducer,
  },
});

export default store;
