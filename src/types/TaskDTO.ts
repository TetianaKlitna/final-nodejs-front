export type TaskDTO = {
  taskId: string;
  title: string;
  dueDate: Date;
  status: 'To-Do' | 'In-Progress' | 'Done';
};
