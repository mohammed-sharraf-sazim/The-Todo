import { Toaster } from '@/shared/components/ui/toaster';
import React, { ReactNode } from 'react'

interface TodoLayoutProps {
    children: ReactNode; 
  }

const TodoLayout: React.FC<TodoLayoutProps> = ({ children }) => {
  return (
    <div>
      <div className="min-h-screen bg-gray-300 p-4">
      {children}
      <Toaster/>
    </div>
    </div>
  )
}

export default TodoLayout
