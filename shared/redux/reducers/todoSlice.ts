// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { Todo } from "@/modules/todo/models";

// interface TodosState {
//   todos: Todo[];
//   history: { todos: Todo[] }[];
//   future: { todos: Todo[] }[];
//   statusFilter: "all" | "active" | "completed";
//   priorityFilter: "all" | "High" | "Medium" | "Low" | "No Priority";
//   dueDateFilter: "all" | "overdue" | "today" | "upcoming";
// }

// // const TODOS_LOCAL_STORAGE_KEY = "todos";

// // const loadTodosFromLocalStorage = (): Todo[] => {
// //   if (typeof window === "undefined") {
// //     return [];
// //   }

// //   const todosJson = localStorage.getItem(TODOS_LOCAL_STORAGE_KEY);
// //   return todosJson ? JSON.parse(todosJson) : [];
// // };

// // const saveTodosToLocalStorage = (todos: Todo[]) => {
// //   if (typeof window === "undefined") {
// //     return;
// //   }

// //   localStorage.setItem(TODOS_LOCAL_STORAGE_KEY, JSON.stringify(todos));
// // };

// const initialState: TodosState = {
//   // todos: loadTodosFromLocalStorage(),
//   todos: [],
//   history: [],
//   future: [],
//   statusFilter: "all",
//   priorityFilter: "all",
//   dueDateFilter: "all",
// };

// const todosSlice = createSlice({
//   name: "todos",
//   initialState,
//   reducers: {
//     addTodo: (state, action: PayloadAction<Todo>) => {
//       state.history.push({ todos: [...state.todos] });
//       state.future = [];
//       state.todos.push(action.payload);
//       // saveTodosToLocalStorage(state.todos);
//     },
//     updateTodo: (state, action: PayloadAction<Todo>) => {
//       const index = state.todos.findIndex(
//         (todo) => todo.id === action.payload.id
//       );
//       if (index !== -1) {
//         state.history.push({todos: [...state.todos]});
//         state.future = [];
//         state.todos[index] = action.payload;
//         // saveTodosToLocalStorage(state.todos);
//       }
//     },
//     deleteTodo: (state, action: PayloadAction<number>) => {
//       state.todos = state.todos.filter((todo) => todo.id !== action.payload);
//       // saveTodosToLocalStorage(state.todos);
//     },
//     toggleTodoCompletion: (state, action: PayloadAction<number>) => {
//       const todo = state.todos.find((task) => task.id === action.payload);
//       if (todo) {
//         todo.isCompleted = !todo.isCompleted;
//         // saveTodosToLocalStorage(state.todos);
//         state.history.push({todos: [...state.todos]});
//         state.future = [];
//       }
//     },
//     clearCompletedTask: (state) => {
//       state.todos = state.todos.filter((todo) => !todo.isCompleted);
//     },
//     setTodoPriority: (
//       state,
//       action: PayloadAction<{ id: number; priority: Todo["priority"] }>
//     ) => {
//       const index = state.todos.findIndex(
//         (todo) => todo.id === action.payload.id
//       );
//       if (index !== -1) {
//         state.history.push({todos: [...state.todos]});
//         state.future = [];
//         state.todos[index].priority = action.payload.priority;
//         // saveTodosToLocalStorage(state.todos);
//       }
//     },
//     setTodoDeadline: (
//       state,
//       action: PayloadAction<{ id: number; deadline: Date | null }>
//     ) => {
//       const index = state.todos.findIndex(
//         (todo) => todo.id === action.payload.id
//       );
//       if (index !== -1) {
//         state.history.push({todos: [...state.todos]});
//         state.future = [];
//         state.todos[index].dueDate = action.payload.deadline;
//         // saveTodosToLocalStorage(state.todos);
//       }
//     },
//     undo: (state) => {
//       if (state.history.length > 0) {
//         const previousState = state.history.pop()!;
//         state.future.push({ todos: [...state.todos] });
//         state.todos = previousState.todos;
//       }
//     },
//     redo: (state) => {
//       if (state.future.length > 0) {
//         const nextState = state.future.pop()!;
//         state.history.push({ todos: [...state.todos] });
//         state.todos = nextState.todos;
//       }
//     },
//     setStatusFilter: (
//       state,
//       action: PayloadAction<"all" | "active" | "completed">
//     ) => {
//       state.statusFilter = action.payload;
//     },
//     setPriorityFilter: (
//       state,
//       action: PayloadAction<"all" | "High" | "Medium" | "Low" | "No Priority">
//     ) => {
//       state.priorityFilter = action.payload;
//     },
//     setDueDateFilter: (
//       state,
//       action: PayloadAction<"all" | "overdue" | "today" | "upcoming">
//     ) => {
//       state.dueDateFilter = action.payload;
//     },
//   },
// });

// export const {
//   addTodo,
//   updateTodo,
//   deleteTodo,
//   toggleTodoCompletion,
//   clearCompletedTask,
//   setTodoPriority,
//   setTodoDeadline,
//   undo,
//   redo,
//   setStatusFilter,
//   setPriorityFilter,
//   setDueDateFilter,
// } = todosSlice.actions;
// export default todosSlice.reducer;
/* eslint-disable no-console */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "@/modules/todo/models";
import { tasksApi } from "./tasksApi";

const TODOS_HISTORY_KEY = "todos_history";
const TODOS_FUTURE_KEY = "todos_future";
export const TODOS_LOCAL_STORAGE_KEY = "todos";

// Load state from localStorage
const loadStateFromLocalStorage = (key: string) => {
  if (typeof window === "undefined") return [];
  const stateJson = localStorage.getItem(key);
  // Check if the retrieved item is not null and can be parsed as JSON
  try {
    return stateJson ? JSON.parse(stateJson) : [];
  } catch (error) {
    console.error("Failed to parse state from localStorage", error);
    return []; // Fallback to an empty array if parsing fails
  }
};

// Save state to localStorage
export const saveStateToLocalStorage = (key: string, state: any) => {
  if (typeof window === "undefined") return;
  try {
    if (state !== undefined) {
      localStorage.setItem(key, JSON.stringify(state));
    } else {
      console.warn(`Attempted to save undefined state to localStorage with key ${key}`);
    }
  } catch (error) {
    console.error("Failed to save state to localStorage", error);
  }
};


interface TodosState {
  todos: Todo[];
  history: { todos: Todo[] }[];
  future: { todos: Todo[] }[];
  statusFilter: "all" | "active" | "completed";
  priorityFilter: "all" | "High" | "Medium" | "Low" | "No Priority";
  dueDateFilter: "all" | "overdue" | "today" | "upcoming";
}

const initialState: TodosState = {
  todos: loadStateFromLocalStorage(TODOS_LOCAL_STORAGE_KEY),
  history: loadStateFromLocalStorage(TODOS_HISTORY_KEY),
  future: loadStateFromLocalStorage(TODOS_FUTURE_KEY),
  statusFilter: "all",
  priorityFilter: "all",
  dueDateFilter: "all",
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.history.push({ todos: [...state.todos] });
      state.future = [];
      state.todos.push(action.payload);
      saveStateToLocalStorage(TODOS_LOCAL_STORAGE_KEY, state.todos);
      saveStateToLocalStorage(TODOS_HISTORY_KEY, state.history);
      saveStateToLocalStorage(TODOS_FUTURE_KEY, state.future);
    },
    updateTodo: (state, action: PayloadAction<Todo>) => {
      const index = state.todos.findIndex((todo) => todo.id === action.payload.id);
      if (index !== -1) {
        state.history.push({ todos: [...state.todos] });
        state.future = [];
        state.todos[index] = action.payload;
        saveStateToLocalStorage(TODOS_LOCAL_STORAGE_KEY, state.todos);
        saveStateToLocalStorage(TODOS_HISTORY_KEY, state.history);
        saveStateToLocalStorage(TODOS_FUTURE_KEY, state.future);
      }
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      saveStateToLocalStorage(TODOS_LOCAL_STORAGE_KEY, state.todos);
    },
    undo: (state) => {
      if (state.history.length > 0) {
        const previousState = state.history.pop()!;
        state.future.push({ todos: [...state.todos] });
        state.todos = previousState.todos;
        saveStateToLocalStorage(TODOS_LOCAL_STORAGE_KEY, state.todos);
        saveStateToLocalStorage(TODOS_HISTORY_KEY, state.history);
        saveStateToLocalStorage(TODOS_FUTURE_KEY, state.future);
      }
    },
    redo: (state) => {
      if (state.future.length > 0) {
        const nextState = state.future.pop()!;
        state.history.push({ todos: [...state.todos] });
        state.todos = nextState.todos;
        saveStateToLocalStorage(TODOS_LOCAL_STORAGE_KEY, state.todos);
        saveStateToLocalStorage(TODOS_HISTORY_KEY, state.history);
        saveStateToLocalStorage(TODOS_FUTURE_KEY, state.future);
      }
    },
    setStatusFilter: (state, action: PayloadAction<"all" | "active" | "completed">) => {
      state.statusFilter = action.payload;
    },
    setPriorityFilter: (
      state,
      action: PayloadAction<"all" | "High" | "Medium" | "Low" | "No Priority">
    ) => {
      state.priorityFilter = action.payload;
    },
    setDueDateFilter: (
      state,
      action: PayloadAction<"all" | "overdue" | "today" | "upcoming">
    ) => {
      state.dueDateFilter = action.payload;
    },
  },
});

export const {
  addTodo,
  updateTodo,
  deleteTodo,
  undo,
  redo,
  setStatusFilter,
  setPriorityFilter,
  setDueDateFilter,
} = todosSlice.actions;

export default todosSlice.reducer;
