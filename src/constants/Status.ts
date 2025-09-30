import type { TaskDTO } from '../types';

export const STATUS = {
  TODO: 'To-Do',
  IN_PROGRESS: 'In-Progress',
  DONE: 'Done',
} as const;

export const COL_TO_STATUS: Record<string, TaskDTO['status']> = {
  todo: 'To-Do',
  inprogress: 'In-Progress',
  done: 'Done',
};

export const STATUS_VALUES = Object.values(STATUS);

export type Status = (typeof STATUS)[keyof typeof STATUS];
