import type { Status, Priority } from '../constants';

export interface Task {
  title: string;
  dueDate: string;
  description: string;
  status: Status;
  priority: Priority;
}

export interface TaskDTO extends Task {
  taskId: string;
}
