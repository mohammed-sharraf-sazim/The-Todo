// src/components/FilteredTasks.tsx
import React from "react";
import { Tasks } from "../Model";

interface FilteredTasksProps {
  tasks: Tasks[];
  filter: string;
  priorityFilter: string;
  dateFilter: string;
  setFilteredTasks: (filteredTasks: Tasks[]) => void;
}

const FilteredTasks: React.FC<FilteredTasksProps> = ({
  tasks,
  filter,
  priorityFilter,
  dateFilter,
  setFilteredTasks,
}) => {
  React.useEffect(() => {
    const filterDeadlineTasks = (task: Tasks) => {
      const today = new Date();
      const taskDate = task.deadline?.to ? new Date(task.deadline.to) : null;

      if (taskDate) {
        if (dateFilter === 'today') {
          return taskDate.toDateString() === today.toDateString();
        } else if (dateFilter === 'upcoming') {
          return taskDate > today;
        } else if (dateFilter === 'overdue') {
          return taskDate < today;
        }
      }
      return true;
    };

    const filteredTasks = tasks.filter(task => {
      const dateCondition = filterDeadlineTasks(task);

      if (filter === 'all' && priorityFilter === 'all') {
        return dateCondition;
      } else if (filter === 'completed' && priorityFilter === 'all') {
        return task.isCompleted && dateCondition;
      } else if (filter === 'active' && priorityFilter === 'all') {
        return !task.isCompleted && dateCondition;
      } else if (filter === 'all' && priorityFilter !== 'all') {
        return task.priority === priorityFilter && dateCondition;
      } else if (filter === 'completed' && priorityFilter !== 'all') {
        return task.isCompleted && task.priority === priorityFilter && dateCondition;
      } else if (filter === 'active' && priorityFilter !== 'all') {
        return !task.isCompleted && task.priority === priorityFilter && dateCondition;
      }
      return false;
    });

    setFilteredTasks(filteredTasks);
  }, [tasks, filter, priorityFilter, dateFilter, setFilteredTasks]);

  return null;
};

export default FilteredTasks;
