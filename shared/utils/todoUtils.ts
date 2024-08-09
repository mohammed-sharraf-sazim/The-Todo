import { Todo } from "@/modules/todo/models";

export const priorityMap: { [key: string]: number } = {
  High: 3,
  Medium: 2,
  Low: 1,
  "No Priority": 0,
};

export const filterTodos = (
  todos: Todo[],
  statusFilter: 'all' | 'active' | 'completed',
  priorityFilter: 'all' | 'High' | 'Medium' | 'Low' | 'No Priority',
  dueDateFilter: 'all' | 'overdue' | 'today' | 'upcoming'
): Todo[] => {
  return todos.filter((todo) => {
    const statusMatch =
      statusFilter === "all" ||
      (statusFilter === "active" && !todo.isCompleted) ||
      (statusFilter === "completed" && todo.isCompleted);

    const priorityMatch =
      priorityFilter === "all" || todo.priority === priorityFilter;

    let dueDateMatch = true;
    if (dueDateFilter !== "all" && todo.dueDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const deadline = new Date(todo.dueDate);
      deadline.setHours(0, 0, 0, 0);
      if (dueDateFilter === "overdue") {
        dueDateMatch = deadline < today;
      } else if (dueDateFilter === "today") {
        dueDateMatch = deadline.getTime() === today.getTime();
      } else if (dueDateFilter === "upcoming") {
        dueDateMatch = deadline > today;
      }
    }

    return statusMatch && priorityMatch && dueDateMatch;
  });
};

export const sortTodos = (todos: Todo[]): Todo[] => {
  return [...todos].sort((firstNumber, secondNumber) => {
    if (firstNumber.isCompleted === secondNumber.isCompleted) {
      return (
        (priorityMap[secondNumber.priority] || 0) -
        (priorityMap[firstNumber.priority] || 0)
      );
    }
    return Number(firstNumber.isCompleted) - Number(secondNumber.isCompleted);
  });
};