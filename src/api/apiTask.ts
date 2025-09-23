import { apiCall } from './api';
import type { TaskDTO } from '../types';

export type TaskResponse = {
  tasks: TaskDTO[];
  count: number;
};

export const getTasksByUser = async (): Promise<TaskResponse> => {
  const res = await apiCall<TaskResponse>('get', '/tasks');
  return res;
};

export const getTaskData = async (id: string): Promise<TaskResponse> => {
  const res = await apiCall<TaskResponse>('get', `/tasks/${id}`);
  return res;
};
