// src/shared/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './reducers/todoSlice';

const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
