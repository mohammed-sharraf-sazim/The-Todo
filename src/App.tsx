import React, { useState } from "react";
import "./App.css";
import "./index.css";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import FilterTasks from "./components/FilterTasks";
import FilteredTasks from "./components/FilteredTasks";
import { Priority, Tasks } from "./Model";

function App() {
  const [todo, setTodo] = useState<string>("");
  const [tasks, setTasks] = useState<Tasks[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [priorityFilter , setPriorityFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');
  const [filteredTasks, setFilteredTasks] = useState<Tasks[]>([]);

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
          deadline: { from: new Date(), to: new Date()},
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
        <FilterTasks filter={filter} setFilter={setFilter} priorityFilter={priorityFilter} setPriorityFilter={setPriorityFilter} dateFilter={dateFilter} setDateFilter={setDateFilter} />
      </div>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <FilteredTasks tasks={tasks} filter={filter} priorityFilter={priorityFilter} dateFilter={dateFilter} setFilteredTasks={setFilteredTasks} />
      <TodoList tasks={filteredTasks} setTasks={setTasks} />
    </div>
  );
}

export default App;
