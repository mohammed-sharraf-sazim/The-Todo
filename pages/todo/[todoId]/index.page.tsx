import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/shared/redux/store";
import { Todo } from "@/modules/todo/models";
import { updateTodo, deleteTodo } from "@/shared/redux/reducers/todoSlice";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { toggleTodoCompletion } from "@/shared/redux/reducers/todoSlice";

const TodoDetailsPage = () => {
  const router = useRouter();
  const { todoId } = router.query;
  const todos = useSelector((state: RootState) => state.todos.todos);
  const todo = todos.find((task) => task.id === Number(todoId));
  const dispatch = useDispatch();

  const [task, setTask] = useState(todo?.task || "");
  useEffect(() => {
    if (todo) {
      setTask(todo.task);
    }
  }, [todo]);

  if (!todo) {
    return <div>Loading...</div>;
  }

  const handleUpdateTask = () => {
    if (todo) {
      const updatedTodo: Todo = { ...todo, task };
      dispatch(updateTodo(updatedTodo));
    }
  };

  const handleDeleteTask = () => {
    if (todo) {
      dispatch(deleteTodo(todo.id));
      router.push("/todo");
    }
  };

  const handleToggleCompletion = () => {
    dispatch(toggleTodoCompletion(todo.id));
  };

  return (
    <div className="p-8">
      <Link href="/todo" legacyBehavior>
        <a className="text-blue-500 mb-4 inline-block">Back</a>
      </Link>
      <h1 className="text-3xl font-bold mb-4">Todo Details</h1>
      <label className="block text-lg font-medium text-gray-900">Description of the task:</label>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="border p-2 mb-4 w-full"
      />
       <div className="flex items-center space-x-2 mb-4">
        <label className="block text-lg font-medium text-gray-900">Task Status:</label>
        <Checkbox
          id={`todo-${todo.id}`}
          checked={todo.isCompleted}
          onCheckedChange={handleToggleCompletion}
        />
        <span className={todo.isCompleted ? ' text-gray-500' : ''}>
          {todo.isCompleted ? "Completed" : "Not Completed"}
        </span>
      </div>
      <button onClick={handleUpdateTask} className="bg-blue-500 text-white p-2">
        Update
      </button>
      <Dialog>
        <DialogTrigger asChild>
          <span className="icon">
            <button
              className="bg-red-500 text-white p-2 ml-4"
            >
              Delete
            </button>
          </span>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the task permanently?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="submit" onClick={handleDeleteTask}>
              CONFIRM
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TodoDetailsPage;
