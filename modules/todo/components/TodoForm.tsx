import React, { useState } from "react";
import { FormItem } from "../../../shared/components/ui/form";
import { Button } from "../../../shared/components/ui/button";
import { Input } from "../../../shared/components/ui/input";
import { useAppDispatch } from "@/shared/redux/hooks";
import { TodoSchema } from "../models";
import { addTodo } from "@/shared/redux/reducers/todoSlice";

const TodoForm: React.FC = () => {
  const [text, setText] = useState("");
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string | null>(null);

  const handleAddTask = (event: React.FormEvent) => {
    event.preventDefault();
    const result = TodoSchema.safeParse({
      id: Date.now(),
      task: text,
      isCompleted: false,
      priority: "No",
      deadline: null,
    });
    if (result.success) {
      dispatch(addTodo(result.data));
      setText("");
      setError(null)
    } else {
      setError(result.error.errors[0].message);
    }
  };

  return (
    <div>
    <form onSubmit={handleAddTask} className="flex items-center p-2">
      <FormItem>
        <Input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new todo"
          className="flex-1 p-2 border border-gray-300 rounded"
        />
      </FormItem>
      <FormItem>
        <Button
          type="submit"
          className="p-2 ml-2 text-white bg-blue-500 rounded"
        >
          Add
        </Button>
      </FormItem>
    </form>
    {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default TodoForm;
