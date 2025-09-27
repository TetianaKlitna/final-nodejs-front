export const STATUS = {
  TODO: 'To-Do',
  IN_PROGRESS: 'In-Progress',
  DONE: 'Done',
} as const;

export const STATUS_VALUES = Object.values(STATUS);

export type Status = (typeof STATUS)[keyof typeof STATUS];
