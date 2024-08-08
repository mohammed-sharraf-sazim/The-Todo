import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/shared/redux/hooks";
import { Todo } from "../models";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Card, CardContent } from "@/shared/components/ui/card";
import { useGetTasksQuery, useToggleTaskCompletionMutation } from "@/shared/redux/reducers/tasksApi";
import { filterTodos, sortTodos } from "@/shared/utils/todoUtils";
import Link from "next/link";

const TodoList: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const { statusFilter, priorityFilter, dueDateFilter } = useAppSelector(
    (state) => state.todos
  );
  const {data: todos = []} = useGetTasksQuery();
  const [toggleTaskCompletion] = useToggleTaskCompletionMutation();
  const dispatch = useAppDispatch();

  const handleToggleCompletion = async (id: string) => {
    try {
      await toggleTaskCompletion(id).unwrap();
    } catch (error) {
      console.error('Failed to toggle task completion:', error);
    }
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const filteredTodos = filterTodos(todos, statusFilter, priorityFilter, dueDateFilter);
  const sortedTodos = sortTodos(filteredTodos);

  return (
    <div>
      {sortedTodos.length === 0 ? (
        <div className="text-center py-10">
          <h2 className="text-2xl font-semibold text-gray-600">
            There are no tasks
          </h2>
          <p className="text-gray-500 mt-2">
            Try adjusting your filter settings or add new tasks.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedTodos.map((todo: Todo) => {
            const deadline = todo.dueDate ? new Date(todo.dueDate) : null;
            const formattedDeadline = deadline
              ? deadline.toISOString().split("T")[0]
              : "No deadline";
            return (
              <Card key={todo.id}>
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`todo-${todo.id}`}
                      checked={todo.isCompleted}
                      onClick={() => handleToggleCompletion(todo.id)}
                    />
                    <label
                      htmlFor={`todo-${todo.id}`}
                      className={`text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                        todo.isCompleted ? "line-through text-gray-500" : ""
                      }`}
                    >
                      Task: {todo.description}
                    </label>
                  </div>
                  <div>
                    <span className="block text-sm">
                      Priority: {todo.priority}
                    </span>
                    <span className="block text-sm">
                      Deadline: {formattedDeadline}
                    </span>
                  </div>
                  <Link href={`/todos/${todo.id}`} legacyBehavior>
                    <a className="text-blue-500">View Details</a>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TodoList;
