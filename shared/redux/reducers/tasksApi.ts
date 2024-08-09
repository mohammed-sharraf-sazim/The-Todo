import { Todo } from "@/modules/todo/models";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tasksApi = createApi({
  reducerPath: "tasksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    credentials: "include",
  }),
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    getTasks: builder.query<Todo[], void>({
      query: () => "/todos",
      providesTags: ["Todos"],
    }),
    getTasksById: builder.query<Todo, string>({
      query: (id) => `todos/${id}`,
    }),
    addTask: builder.mutation<Todo, Partial<Todo>>({
      query: (newTask) => ({
        url: "/todos",
        method: "POST",
        body: newTask,
      }),
      invalidatesTags: ["Todos"],
    }),
    updateTask: builder.mutation<Todo, Partial<Todo>>({
      query: ({ id, ...patch }) => ({
        url: `/todos/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["Todos"],
    }),
    deleteTask: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todos"],
    }),
    toggleTaskCompletion: builder.mutation<Todo, string>({
      query: (id) => ({
        url: `/todos/${id}/toggle`,
        method: "PATCH",
      }),
      invalidatesTags: ["Todos"],
    }),
    clearCompletedTasks: builder.mutation<void, void>({
      query: () => ({
        url: `/todos/clear/completed`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todos"],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetTasksByIdQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useToggleTaskCompletionMutation,
  useClearCompletedTasksMutation,
} = tasksApi;