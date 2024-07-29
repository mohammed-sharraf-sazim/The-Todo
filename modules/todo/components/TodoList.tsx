import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/shared/redux/hooks";
import { Todo } from "../models";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Card, CardContent } from "@/shared/components/ui/card";

const TodoList: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const todos = useAppSelector((state) => state.todos.todos);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; 
  }

  return (
    <div className="space-y-4">
      {todos.map((todo: Todo) => (
        <Card key={todo.id}>
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id={`todo-${todo.id}`}
                checked={todo.isCompleted}
                disabled
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
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TodoList;