import React from 'react'
import TodoForm from '../components/TodoForm'

const TodoPageContainer: React.FC = () => {
  return (
    <div className="max-w-md mx-auto mt-8">
       <h1 className="text-2xl font-bold mb-4">Plan Your Thoughts</h1>
       <TodoForm/>
    </div>
  )
}

export default TodoPageContainer
