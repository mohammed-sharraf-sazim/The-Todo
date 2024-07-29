import React from 'react'
import TodoForm from '../components/TodoForm'
import TodoList from '../components/TodoList'

const TodoPageContainer: React.FC = () => {
  return (
    <div className="max-w-md mx-auto mt-8">
       <h1 className="text-4xl font-bold mb-4">Plan Your Thoughts</h1>
       <TodoForm/>
       <TodoList/>
    </div>
  )
}

export default TodoPageContainer
