import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "@/modules/todo/models";

interface TodosState {
  todos: Todo[];
}

const TODOS_LOCAL_STORAGE_KEY = "todos";

const loadTodosFromLocalStorage = (): Todo[] => {
  if (typeof window === 'undefined') {
    return []; 
  }
  
  const todosJson = localStorage.getItem(TODOS_LOCAL_STORAGE_KEY);
  return todosJson ? JSON.parse(todosJson) : [];
};

const saveTodosToLocalStorage = (todos: Todo[]) => {
  if (typeof window === 'undefined') {
    return; 
  }
  
  localStorage.setItem(TODOS_LOCAL_STORAGE_KEY, JSON.stringify(todos));
};

const initialState: TodosState = {
  todos: loadTodosFromLocalStorage(),
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
      saveTodosToLocalStorage(state.todos);
    },
  },
});

export const { addTodo } = todosSlice.actions;
export default todosSlice.reducer;
