import React, { ReactNode } from 'react'

interface TodoLayoutProps {
    children: ReactNode; 
  }

const TodoLayout: React.FC<TodoLayoutProps> = ({ children }) => {
  return (
    <div>
      <div className="min-h-screen bg-gray-100 p-4">
      {children}
    </div>
    </div>
  )
}

export default TodoLayout
