import { z } from 'zod';

const startDate = new Date();
const endDate = new Date();

export const TodoSchema = z.object({
  id: z.number(),
  task: z.string().min(1, { message: "Task cannot be empty" }),
  isCompleted: z.boolean(),
  priority: z.enum(['Low', 'Medium', 'High', 'No']),
  deadline: z.date().nullable().refine(date => date === null || (date >= startDate && date <= endDate), {
    message: `Deadline must be between ${startDate.toDateString()} and ${endDate.toDateString()}`,
  }),
});

export type Todo = z.infer<typeof TodoSchema>;

export const Priority = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
  NOT_SET: 'No'
} as const;
