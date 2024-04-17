// store.js
import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './loginSlice';
import postReducer from './postSlice';
import interestReducer from './interestSlice';

export default configureStore({
  reducer: {
    login: loginReducer,
    post: postReducer,
    interests: interestReducer
  },
});
