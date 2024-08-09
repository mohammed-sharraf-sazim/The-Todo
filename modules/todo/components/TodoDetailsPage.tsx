import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useGetTasksByIdQuery, useUpdateTaskMutation, useDeleteTaskMutation, useToggleTaskCompletionMutation } from "@/shared/redux/reducers/tasksApi";
import { Button } from "@/shared/components/ui/button";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { useToast } from "@/shared/components/ui/use-toast";
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

const TodoDetailsPage = () => {
  const router = useRouter();
  const { todoId } = router.query;
  
  const { data: todo, isLoading } = useGetTasksByIdQuery(todoId as string);
  const [updateTodo] = useUpdateTaskMutation();
  const [deleteTodo] = useDeleteTaskMutation();
  const { toast } = useToast();

  const [task, setTask] = useState(todo?.description || "");
  const [error, setError] = useState<string | null>(null)
  const [priority, setPriority] = useState<"Low" | "Medium" | "High" | "No priority">(todo?.priority || "No priority");
  const [deadline, setDeadline] = useState(todo?.dueDate ? new Date(todo.dueDate).toISOString().split("T")[0] : "");

  useEffect(() => {
    if (todo) {
      setTask(todo.description);
      setPriority(todo.priority);
      setDeadline(todo.dueDate ? new Date(todo.dueDate).toISOString().split("T")[0] : "");
    }
  }, [todo]);

  const handleUpdateTask = async () => {
    if (todo) {
      const updatedTodo = { ...todo, description: task, priority, dueDate: deadline ? new Date(deadline) : null };
      try {
        await updateTodo(updatedTodo).unwrap();
        toast({
          title: "Task Updated",
          description: "Your task has been successfully updated.",
        });
        router.push('/todos');
      } catch {
        setError("Failed to update the task");
      }
    }
  };

  const handleDeleteTask = async () => {
    if (todo) {
      try {
        await deleteTodo(todo.id).unwrap();
        router.push("/todos");
      } catch (error) {
        setError("Failed to delete the task");
      }
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!todo) {
    return <div>Task not found.</div>;
  }

  return (
    <div className="p-10">
      <Link href="/todos" legacyBehavior>
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
        <span className={todo.isCompleted ? ' text-gray-500' : ''}>
          {todo.isCompleted ? "Completed" : "Not Completed"}
        </span>
      </div>
      <div className="mb-4">
        <label className="block text-lg font-medium text-gray-900">Priority:</label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as "Low" | "Medium" | "High" | "No priority")}
          className="border p-2 w-full"
        >
          <option value="No priority">No priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-lg font-medium text-gray-900">Deadline:</label>
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="border p-2 w-full"
        />
      </div>
      <Button onClick={handleUpdateTask} className="bg-blue-500 text-white p-2 rounded">
        Update
      </Button>
      <Dialog>
        <DialogTrigger asChild>
          <span className="icon">
            <button
              className="bg-red-500 text-white p-2 ml-4 rounded"
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
