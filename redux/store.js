import { configureStore } from '@reduxjs/toolkit';
import levelsReducer from './levelsSlice'

const store = configureStore({
  reducer: {
    levels: levelsReducer
  },
});

export default store;
