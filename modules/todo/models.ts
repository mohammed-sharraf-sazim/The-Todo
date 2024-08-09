import { z } from 'zod';

const startDate = new Date();
const endDate = new Date();

export const TodoSchema = z.object({
  id: z.number(),
  description: z.string().min(1, { message: "Task cannot be empty" }).regex(/.*\S.*/, { message: "Task cannot be only whitespace" }),
  isCompleted: z.boolean(),
  priority: z.enum(['Low', 'Medium', 'High', 'No priority']),
  dueDate: z.date().nullable().refine(date => date === null || (date >= startDate && date <= endDate), {
    message: `Deadline must be between ${startDate.toDateString()} and ${endDate.toDateString()}`,
  }),
});

export type Todo = z.infer<typeof TodoSchema>;

export const Priority = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
  NOT_SET: 'No priority'
} as const;
