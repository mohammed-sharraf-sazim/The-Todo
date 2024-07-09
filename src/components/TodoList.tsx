import React from 'react'
import {Tasks} from '../Model'
import SingleTask from './SingleTask'
import './TodoList.css'

interface Props {
    tasks: Tasks[],
    setTasks: React.Dispatch<React.SetStateAction<Tasks[]>>
}

const TodoList: React.FC<Props> = ({tasks, setTasks}) => {
  return (
    <div className='todos'>
      {
        tasks.map((task) => (
            <SingleTask task={task} key={task.id} tasks={tasks} setTasks={setTasks}/>
        ))
        }
    </div>
  )
}

export default TodoList
