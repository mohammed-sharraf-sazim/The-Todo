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
import { TodoSchema } from "../models";
import { addTodo } from "@/shared/redux/reducers/todoSlice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  clearCompletedTask,
  undo,
  redo,
  setStatusFilter,
  setPriorityFilter,
  setDueDateFilter
} from "@/shared/redux/reducers/todoSlice";
import TaskFilters from './TaskFilters';

const TodoForm: React.FC = () => {
  const todos = useAppSelector((state) => state.todos.todos);
  const dispatch = useAppDispatch();
 const [error, setError] = useState<string | null>(null);
  const form = useForm({
    resolver: zodResolver(TodoSchema.pick({ task: true })),
    defaultValues: {
      task: "",
    },
  });

  const onSubmit = (values: { task: string }) => {
    const result = TodoSchema.safeParse({
      id: Date.now(),
      task: values.task,
      isCompleted: false,
      priority: "No Priority",
      deadline: null,
    });
    if (result.success) {
      dispatch(addTodo(result.data));
      form.reset();
    } else {
      setError(result.error.errors[0].message);
    }
  };

  const handleClearCompletedTask = () => {
    dispatch(clearCompletedTask());
  };

  const undoTodo = useAppSelector((state) => state.todos.history.length > 0);
  const redoTodo = useAppSelector((state) => state.todos.future.length > 0);

  const handleStatusFilterChange = (value: 'all' | 'active' | 'completed') => {
    dispatch(setStatusFilter(value));
  };

  const handlePriorityFilterChange = (value: 'all' | 'High' | 'Medium' | 'Low' | 'No Priority') => {
    dispatch(setPriorityFilter(value));
  };

  const handleDueDateFilterChange = (value: 'all' | 'overdue' | 'today' | 'upcoming') => {
    dispatch(setDueDateFilter(value));
  };

  return (
    <Form {...form}>
      <div>
      <div className="ml-4 flex space-x-4">
        <Button
          onClick={handleClearCompletedTask}
          className="bg-red-500 text-white p-2 rounded"
        >
          Clear Completed Task
        </Button>
        <Button onClick={() => dispatch(undo())} disabled={!undoTodo} className="bg-purple-400 text-white p-2 rounded">
          Undo
        </Button>
        <Button onClick={() => dispatch(redo())} disabled={!redoTodo} className="bg-violet-700 text-white p-2 rounded">
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
        onSubmit={form.handleSubmit(onSubmit)}
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
          <Button type="submit" className="p-2 text-white bg-blue-500 rounded">
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
