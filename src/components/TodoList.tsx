import React from "react";
import { Tasks } from "../Model";
import SingleTask from "./SingleTask";
import "./TodoList.css";

interface Props {
  tasks: Tasks[];
  setTasks: React.Dispatch<React.SetStateAction<Tasks[]>>;
  history: Tasks[][];
  future: Tasks[][];
  setHistory: React.Dispatch<React.SetStateAction<Tasks[][]>>;
  setFuture: React.Dispatch<React.SetStateAction<Tasks[][]>>;
  undo: () => void;
  redo: () => void;
  updateHistory: (newTasks: Tasks[]) => void;
}

const TodoList: React.FC<Props> = ({
  tasks,
  setTasks,
  undo,
  redo,
  updateHistory,
  history,
  future,
  setHistory,
  setFuture,
}) => {
  const sortedTasks = tasks.sort((firstNum, secondNum) => {
    const priorityOrder = {
      High: 3,
      Medium: 2,
      Low: 1
    }
    if (firstNum.isCompleted !== secondNum.isCompleted){
      return firstNum.isCompleted ? 1 : -1
    }
    const firstPriority = priorityOrder[firstNum.priority ?? 'High']
    const secondPriority = priorityOrder[secondNum.priority ?? 'High']
    return (secondPriority) - (firstPriority)
  })

  return (
    <div className="todos">
      {sortedTasks.map((task) => (
        <SingleTask
          task={task}
          key={task.id}
          tasks={tasks}
          setTasks={setTasks}
          updateHistory={updateHistory}
          undo={undo}
          redo={redo}
          history={history}
          setHistory={setHistory}
          future={future}
          setFuture={setFuture}
        />
      ))}
    </div>
  );
};

export default TodoList;
