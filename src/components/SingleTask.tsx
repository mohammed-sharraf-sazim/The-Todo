import React, { useState } from "react";
import { Tasks, Priority } from "../Model";
import "./SingleTask.css";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Calendar } from "../components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { Button } from "../components/ui/button";
import { cn } from "../lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";

interface Props {
  task: Tasks;
  tasks: Tasks[];
  setTasks: React.Dispatch<React.SetStateAction<Tasks[]>>;
}

const SingleTask = ({ task, tasks, setTasks }: Props) => {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });

  const [priorityInput, setPriorityInput] = useState<string>("High" || "");

  const handlePriorityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as Priority;
    setPriorityInput(value);
    const updateTasks = tasks.map((t) =>
      t.id === task.id ? { ...t, priority: value } : t
    );
    setTasks(updateTasks);
  };

  const handleCheck = (id : number)=> {
    setTasks(
      tasks.map((task)=> 
        task.id === id ? {...task, isCompleted: !task.isCompleted} : task
      )
    )
  }

  return (
    <div>
      <form className="todos__single">
        {task.isCompleted ? (
          <s className="todos__single--text">
            {task.task + " |Priority: " + task.priority}{" "}
          </s>
        ) : (
          <span className="todos__single--text">
            {task.task + " |Priority: " + task.priority}{" "}
          </span>
        )}
        <div>
          <span className="icon">
            <EditIcon />
          </span>
          <Dialog>
            <DialogTrigger asChild>
              <span className="icon">
                <DeleteForeverIcon />
              </span>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogDescription>
                  Type DELETE to delete the task permanently.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Input
                    id="name"
                    defaultValue="type DELETE"
                    className="col-span-4"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <span className="icon" onClick={()=>handleCheck(task.id)}>
            <CheckIcon />
          </span>
          <Dialog>
            <DialogTrigger asChild>
              <span className="icon">
                <MoreHorizIcon />
              </span>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Set Priority</DialogTitle>
                <DialogDescription>
                  Set the priority of your task to High, Medium or Low.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Input
                    id="priority"
                    value={priorityInput}
                    onChange={handlePriorityChange}
                    className="col-span-4"
                    value={priorityInput}
                    onChange={handlePriorityChange}
                  />
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <span className="icon">
                <CalendarMonthIcon />
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant={"outline"}
                    className={cn(
                      "w-[300px] justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date?.from ? (
                      date.to ? (
                        <>
                          {format(date.from, "LLL dd, y")} -{" "}
                          {format(date.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(date.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </form>
    </div>
  );
};

export default SingleTask;
