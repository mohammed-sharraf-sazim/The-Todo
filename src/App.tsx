import React, { useState } from "react";
import "./App.css";
import "./index.css";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import { Priority, Tasks } from "./Model";

function App() {
  const [todo, setTodo] = useState<string>("");
  const [tasks, setTasks] = useState<Tasks[]>([]);

  const clearCompletedTasks = (()=> {
    const activeTasks = tasks.filter((task) => !task.isCompleted)
    setTasks(activeTasks)
  })

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          task: todo,
          isCompleted: false,
          priority: Priority.HIGH,
          deadline: new Date(),
        },
      ]);
      setTodo("");
    }
  };

  return (
    <div className="App">
      <h1 className="heading">Plan Your Thoughts! 😀 </h1>
      <div className="flex justify-center space-x-4 mb-6">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={clearCompletedTasks}
        >
          Clear Completed Tasks
        </button>
      </div>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <TodoList tasks={tasks} setTasks={setTasks} />
    </div>
  );
}

export default App;
