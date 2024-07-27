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
    updateTodo: (state, action: PayloadAction<Todo>) => {
      const index = state.todos.findIndex((todo) => todo.id === action.payload.id)
      if (index !== -1) {
        state.todos[index] = action.payload;
        saveTodosToLocalStorage(state.todos);
      }
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
      saveTodosToLocalStorage(state.todos);
    },
    toggleTodoCompletion: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find(task => task.id === action.payload);
      if (todo) {
        todo.isCompleted = !todo.isCompleted;
      }
      console.log(todo?.isCompleted);
      
    },
  },
});

export const { addTodo, updateTodo, deleteTodo, toggleTodoCompletion } = todosSlice.actions;
export default todosSlice.reducer;
