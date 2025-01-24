// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authslice';
import taskReducer from '../features/taskSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer, // Add tasks reducer here
  },
});

export default store;
