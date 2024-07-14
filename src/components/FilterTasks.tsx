import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Priority } from "../Model";

interface Props {
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  priorityFilter: string | Priority;
  setPriorityFilter: React.Dispatch<React.SetStateAction<string>>;
}

const FilterTasks: React.FC<Props> = ({ filter, setFilter, priorityFilter, setPriorityFilter }) => {
  return (
    <div className="flex justify-center space-x-4 mb-6">
      <Select >
        <SelectTrigger className="w-[180px] bg-blue-500 text-white">
          <SelectValue  placeholder="Filter by state" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>State of task</SelectLabel>
            <div className="flex flex-col space-y-2">
              <button
                className={`bg-dark-gray-100 px-4 py-2 rounded-md ${
                  filter === "all" ? "bg-blue-500 text-white" : "text-gray-700"
                }`}
                onClick={() => setFilter("all")}
              >
                All
              </button>
              <button
                className={`bg-dark-gray-100 px-4 py-2 rounded-md ${
                  filter === "active"
                    ? "bg-blue-500 text-white"
                    : "text-gray-700"
                }`}
                onClick={() => setFilter("active")}
              >
                Active
              </button>
              <button
                className={`bg-dark-gray-100 px-4 py-2 rounded-md ${
                  filter === "completed"
                    ? "bg-blue-500 text-white"
                    : "text-gray-700"
                }`}
                onClick={() => setFilter("completed")}
              >
                Completed
              </button>
            </div>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select >
        <SelectTrigger className="w-[180px] bg-blue-500 text-white">
          <SelectValue  placeholder="Filter by priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>State of Task</SelectLabel>
            <div className="flex flex-col space-y-2">
              <button
                className={`bg-dark-gray-100 px-4 py-2 rounded-md ${
                  priorityFilter === "all" ? "bg-blue-500 text-white" : "text-gray-700"
                }`}
                onClick={() => setPriorityFilter("all")}
              >
                All
              </button>
              <button
                className={`bg-dark-gray-100 px-4 py-2 rounded-md ${
                  priorityFilter === "High"
                    ? "bg-blue-500 text-white"
                    : "text-gray-700"
                }`}
                onClick={() => setPriorityFilter("High")}
              >
                High
              </button>
              <button
                className={`bg-dark-gray-100 px-4 py-2 rounded-md ${
                  priorityFilter === "Medium"
                    ? "bg-blue-500 text-white"
                    : "text-gray-700"
                }`}
                onClick={() => setPriorityFilter("Medium")}
              >
                Medium
              </button>
              <button
                className={`bg-dark-gray-100 px-4 py-2 rounded-md ${
                  priorityFilter === "Low"
                    ? "bg-blue-500 text-white"
                    : "text-gray-700"
                }`}
                onClick={() => setPriorityFilter("Low")}
              >
                Low
              </button>
            </div>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
    
  );
};

export default FilterTasks;