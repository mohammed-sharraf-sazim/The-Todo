/* eslint-disable no-console */
import React, { useState } from "react";
import {
  FormItem,
  Form,
  FormField,
  FormMessage,
} from "@/shared/components/ui/form";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/shared/redux/hooks";
import { Todo, TodoSchema } from "../models";
import { useAddTaskMutation, useClearCompletedTasksMutation, useUpdateTaskMutation } from "@/shared/redux/reducers/tasksApi";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  // clearCompletedTask,
  undo,
  redo,
  setStatusFilter,
  setPriorityFilter,
  setDueDateFilter,
} from "@/shared/redux/reducers/todoSlice";
import TaskFilters from "./TaskFilters";
import { Priority } from "@/modules/todo/models";
import { saveStateToLocalStorage, TODOS_LOCAL_STORAGE_KEY } from '@/shared/redux/reducers/todoSlice';


export type FormValues = {
  task: string;
};

const TodoForm: React.FC = () => {
  
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string | null>(null);
  const [addTodo] = useAddTaskMutation();
  const [clearCompletedTask] = useClearCompletedTasksMutation();
  const [updateTask] = useUpdateTaskMutation();
  const todos = useAppSelector((state) => state.todos.todos);

  const form = useForm<FormValues>({
    resolver: zodResolver(TodoSchema.pick({ description: true })),
    defaultValues: {
      task: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues>  = async (values: { task: string }) => {
    try {
      const taskToAdd = {
        description: values.task,
        isCompleted: false,
        priority: Priority.NOT_SET,
        dueDate: new Date(),
      };
      const result = await addTodo(taskToAdd).unwrap();
      form.reset();
    } catch (error: unknown) {
    if (error instanceof Error) {
      setError(error.message)
    }
    if (typeof error === 'object' && error !== null && 'response' in error) {
      const responseError = error as { response: { status: number; data: any } };
      setError(responseError.response.data)
    }
    }
  };

  const handleClearCompleted = async () => {
    try {
      await clearCompletedTask().unwrap();
    } catch (error) {
      console.error('Failed to clear completed tasks:', error);
    }
  };

  const syncTodosWithBackend = async (todos: Todo[]) => {
    try {
      await Promise.all(
        todos.map((todo) =>
          updateTask({
            ...todo,
          }).unwrap()
        )
      );
    } catch (error) {
      console.error("Failed to sync todos with backend:", error);
    }
  };

  const handleUndo = async () => {
    dispatch(undo());
    const currentTodos = [...todos];
    console.log('Todos before saving to localStorage:', todos);
    saveStateToLocalStorage(TODOS_LOCAL_STORAGE_KEY, currentTodos);
    await syncTodosWithBackend(currentTodos);
  };

  const handleRedo = async () => {
    dispatch(redo());
    const currentTodos = [...todos];
    saveStateToLocalStorage(TODOS_LOCAL_STORAGE_KEY, currentTodos);
    await syncTodosWithBackend(currentTodos);
  };


  // const undoTodo = useAppSelector((state) => state.todos.history.length > 0);
  // const redoTodo = useAppSelector((state) => state.todos.future.length > 0);



  const handleStatusFilterChange = (value: "all" | "active" | "completed") => {
    dispatch(setStatusFilter(value));
  };

  const handlePriorityFilterChange = (
    value: "all" | "High" | "Medium" | "Low" | "No Priority"
  ) => {
    dispatch(setPriorityFilter(value));
  };

  const handleDueDateFilterChange = (
    value: "all" | "overdue" | "today" | "upcoming"
  ) => {
    dispatch(setDueDateFilter(value));
  };

  return (
    <Form {...form}>
      <div>
        <div className="ml-4 flex space-x-4">
          <Button
            onClick={handleClearCompleted}
            className="bg-red-500 text-white p-2 rounded"
          >
            Clear Completed Task
          </Button>
          <Button
            // onClick={() => dispatch(undo())}
            // disabled={!undoTodo}
            onClick={handleUndo}
            className="bg-purple-400 text-white p-2 rounded"
          >
            Undo
          </Button>
          <Button
            // onClick={() => dispatch(redo())}
            // disabled={!redoTodo}
            onClick={handleRedo}
            className="bg-violet-700 text-white p-2 rounded"
          >
            Redo
          </Button>
        </div>
        <div className="mt-4 ml-4 flex space-x-4">
          <TaskFilters
            onStatusFilterChange={handleStatusFilterChange}
            onPriorityFilterChange={handlePriorityFilterChange}
            onDueDateFilterChange={handleDueDateFilterChange}
          />
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(form.getValues());
          }}
          className="flex items-center p-4"
        >
          <FormField
            control={form.control}
            name="task"
            render={({ field }) => (
              <FormItem>
                <Input
                  {...field}
                  placeholder="Add a new todo"
                  className="flex-1 p-2 border border-gray-300 rounded"
                />
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
          <div className="ml-4">
            <Button
              type="submit"
              className="p-2 text-white bg-blue-500 rounded"
            >
              Add
            </Button>
          </div>
        </form>
        {error && <div className="error-message">{error}</div>}
      </div>
    </Form>
  );
};

export default TodoForm;
