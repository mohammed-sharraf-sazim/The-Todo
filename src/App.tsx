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
  const [filter, setFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("all");
  const [history, setHistory] = useState<Tasks[][]>([]);
  const [future, setFuture] = useState<Tasks[][]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      updateHistory(tasks);
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          task: todo,
          isCompleted: false,
          priority: Priority.HIGH,
          deadline: { from: new Date(), to: new Date() },
        },
      ]);
      setTodo("");
    }
  };
  const clearCompletedTasks = () => {
    updateHistory(tasks);
    const activeTasks = tasks.filter((task) => !task.isCompleted);
    setTasks(activeTasks);
  };

  const filterDeadlineTasks = (task: Tasks) => {
    const today = new Date();
    const taskDate = new Date(task.deadline?.to);

    if (dateFilter === "today") {
      return taskDate.toDateString() === today.toDateString();
    } else if (dateFilter === "upcoming") {
      return taskDate > today;
    } else if (dateFilter === "overdue") {
      return taskDate < today;
    }
    return true;
  };

  const filteredTasks = tasks.filter((task) => {
    const dateCondition = filterDeadlineTasks(task);

    if (filter === "all" && priorityFilter === "all") {
      return dateCondition;
    } else if (filter === "completed" && priorityFilter === "all") {
      return task.isCompleted && dateCondition;
    } else if (filter === "active" && priorityFilter === "all") {
      return !task.isCompleted && dateCondition;
    } else if (filter === "all" && priorityFilter !== "all") {
      return task.priority === priorityFilter && dateCondition;
    } else if (filter === "completed" && priorityFilter !== "all") {
      return (
        task.isCompleted && task.priority === priorityFilter && dateCondition
      );
    } else if (filter === "active" && priorityFilter !== "all") {
      return (
        !task.isCompleted && task.priority === priorityFilter && dateCondition
      );
    }
    return false;
  });

  const updateHistory = (newTasks: Tasks[]) => {
    setHistory([...history, newTasks]);
    setFuture([]);
  };

  const undo = () => {
    if (history.length > 0) {
      const previousState = history[history.length - 1];
      setHistory(history.slice(0, history.length - 1));
      setFuture([tasks, ...future]);
      setTasks(previousState);
    }
  };

  const redo = () => {
    if (future.length > 0) {
      const futureState = future[0];
      setFuture(future.slice(1));
      setHistory([...history, tasks]);
      setTasks(futureState);
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
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={undo}
        >
          Undo
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={redo}
        >
          Redo
        </button>
        <FilterTasks
          filter={filter}
          setFilter={setFilter}
          priorityFilter={priorityFilter}
          setPriorityFilter={setPriorityFilter}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
        />
      </div>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <TodoList
        tasks={filteredTasks}
        setTasks={setTasks}
        updateHistory={updateHistory}
        undo={undo}
        redo={redo}
        history={history}
        setHistory={setHistory}
        future={future}
        setFuture={setFuture}
      />
    </div>
  );
}

export default App;
