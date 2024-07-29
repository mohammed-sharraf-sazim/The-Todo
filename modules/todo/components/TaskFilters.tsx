import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";

interface TaskFiltersProps {
  onStatusFilterChange: (value: 'all' | 'active' | 'completed') => void;
  onPriorityFilterChange: (value: 'all' | 'High' | 'Medium' | 'Low' | 'No Priority') => void;
  onDueDateFilterChange: (value: 'all' | 'overdue' | 'today' | 'upcoming') => void;
}

const TaskFilters: React.FC<TaskFiltersProps> = ({
  onStatusFilterChange,
  onPriorityFilterChange,
  onDueDateFilterChange
}) => {
  return (
    <div className="flex space-x-4 mb-4">
      <Select onValueChange={onStatusFilterChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={onPriorityFilterChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All priorities</SelectItem>
          <SelectItem value="High">High</SelectItem>
          <SelectItem value="Medium">Medium</SelectItem>
          <SelectItem value="Low">Low</SelectItem>
          <SelectItem value="No Priority">No Priority</SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={onDueDateFilterChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by due date" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All due dates</SelectItem>
          <SelectItem value="overdue">Overdue</SelectItem>
          <SelectItem value="today">Due today</SelectItem>
          <SelectItem value="upcoming">Upcoming</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default TaskFilters;