export const PRIORITY = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
} as const;

export const PRIORITY_VALUES = Object.values(PRIORITY);

export type Priority = (typeof PRIORITY)[keyof typeof PRIORITY];
