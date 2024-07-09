export interface Tasks{
    id: number,
    task: string,
    isCompleted: boolean,
    priority?: 'high | medium | low',
    deadline: Date;
}