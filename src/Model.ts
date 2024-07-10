export enum Priority {
    High = 'High',
    Medium = 'Medium',
    Low = 'Low'
}
export interface Tasks{
    id: number,
    task: string,
    isCompleted: boolean,
    priority?: Priority,
    deadline: Date;
}