import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/shared/redux/hooks";
import { Todo } from "../models";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Card, CardContent } from "@/shared/components/ui/card";
import { toggleTodoCompletion } from "@/shared/redux/reducers/todoSlice";
import Link from "next/link";

const TodoList: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const todos = useAppSelector((state) => state.todos.todos);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const priorityMap: { [key: string]: number } = {
    High: 3,
    Medium: 2,
    Low: 1,
    "No Priority": 0,
  };


  const sortedTodos = [...todos].sort((firstNumber, secondNumber) => {
    if (firstNumber.isCompleted === secondNumber.isCompleted) {
      return (priorityMap[secondNumber.priority] || 0) - (priorityMap[firstNumber.priority] || 0);
    }
    return Number(firstNumber.isCompleted) - Number(secondNumber.isCompleted);
  });

  return (
    <div className="space-y-4">
      {sortedTodos.map((todo: Todo) => {
        const deadline = todo.deadline ? new Date(todo.deadline) : null;
        const formattedDeadline = deadline ? deadline.toISOString().split('T')[0] : "No deadline";

        return (
          <Card key={todo.id}>
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`todo-${todo.id}`}
                  checked={todo.isCompleted}
                  onClick={() => dispatch(toggleTodoCompletion(todo.id))}
                />
                <label
                  htmlFor={`todo-${todo.id}`}
                  className={`text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                    todo.isCompleted ? 'line-through text-gray-500' : ''
                  }`}
                >
                  Task: {todo.task}
                </label>
              </div>
              <div>
                <span className="block text-sm">Priority: {todo.priority}</span>
                <span className="block text-sm">Deadline: {formattedDeadline}</span>
              </div>
              <Link href={`/todo/${todo.id}`} legacyBehavior>
                <a className="text-blue-500">View Details</a>
              </Link>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default TodoList;
