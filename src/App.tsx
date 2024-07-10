import React, { useState } from 'react';
import './App.css';
import './index.css'
import InputField from './components/InputField';
import TodoList from './components/TodoList';
import { Priority, Tasks } from './Model'



 function App() {

  const [todo, setTodo] = useState<string>("");
  const [tasks, setTasks] = useState<Tasks[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      setTasks([...tasks, { id: Date.now(), task:todo, isCompleted: false, priority: Priority.High, deadline: new Date() }]);
      setTodo("");
    }
  };

  return (
    <div className="App">
      <h1 className='heading'>Plan Your Thoughts! 😀 </h1>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <TodoList tasks={tasks} setTasks={setTasks}/> 
    </div>
  );
}

export default App;
