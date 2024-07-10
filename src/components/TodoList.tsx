import React from 'react'
import {Tasks} from '../Model'
import SingleTask from './SingleTask'
import './TodoList.css'

interface Props {
    tasks: Tasks[],
    setTasks: React.Dispatch<React.SetStateAction<Tasks[]>>
}

const TodoList: React.FC<Props> = ({tasks, setTasks}) => {

  const sortedTasks = tasks.sort((a,b)=>{
    const priorityOrder = {
      High: 3,
      Medium: 2,
      Low: 1
    }
    return (priorityOrder[b.priority! || 0]) - (priorityOrder[a.priority! || 0])
  })

  return (
    <div className='todos'>
      {
        sortedTasks.map((task) => (
            <SingleTask task={task} key={task.id} tasks={tasks} setTasks={setTasks}/>
        ))
        }
    </div>
  )
}

export default TodoList
