import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './reducers/todoSlice';
import { tasksApi } from './reducers/tasksApi';

const store = configureStore({
  reducer: {
    todos: todosReducer,
    [tasksApi.reducerPath]: tasksApi.reducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(tasksApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
