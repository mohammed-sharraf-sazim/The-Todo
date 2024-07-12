import React, { useState } from "react";
import "./App.css";
import "./index.css";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import FilterTasks from "./components/FilterTasks";
import { Priority, Tasks } from "./Model";

function App() {
  const [todo, setTodo] = useState<string>("");
  const [tasks, setTasks] = useState<Tasks[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [priorityFilter , setPriorityFilter] = useState<string>('all');

  const clearCompletedTasks = () => {
    const activeTasks = tasks.filter((task) => !task.isCompleted);
    setTasks(activeTasks);
  };

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

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all' && priorityFilter === 'all') {
      return true;
    } else if (filter === 'completed' && priorityFilter === 'all') {
      return task.isCompleted;
    } else if (filter === 'active' && priorityFilter === 'all') {
      return !task.isCompleted;
    } else if (filter === 'all' && priorityFilter !== 'all') {
      return task.priority === priorityFilter as Priority; // Cast to Priority
    } else if (filter === 'completed' && priorityFilter !== 'all') {
      return task.isCompleted && task.priority === priorityFilter as Priority;
    } else if (filter === 'active' && priorityFilter !== 'all') {
      return !task.isCompleted && task.priority === priorityFilter as Priority;
    }
    return false;
  });
  
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
        <FilterTasks filter={filter} setFilter={setFilter} priorityFilter={priorityFilter as Priority} setPriorityFilter={setPriorityFilter} />
      </div>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <TodoList tasks={filteredTasks} setTasks={setTasks} />
    </div>
  );
}

export default App;