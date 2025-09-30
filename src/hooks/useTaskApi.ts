import {
  getTasksByUser,
  getTaskData,
  createTaskData,
  deleteTaskData,
  updateTaskData,
} from '../api/apiTask';
import type { TasksResponse, TaskResponse } from '../api/apiTask';
import type { Task } from '../types';
import useRequest from './useRequest';

const useTaskApi = () => {
  const { run, isLoading, isError, error } = useRequest();

  const getTasks = () => run<TasksResponse>(getTasksByUser);
  const getTask = (id: string) => run<TaskResponse>(() => getTaskData(id));
  const createTask = (task: Task) =>
    run<TaskResponse>(() => createTaskData(task));
  const deleteTask = (id: string) => run<TaskResponse>(() => deleteTaskData(id));
  const updateTask = (id: string, task: Partial<Task>) =>
    run<TaskResponse>(() => updateTaskData(id, task));

  return {
    isLoading,
    isError,
    error,
    getTasks,
    getTask,
    createTask,
    deleteTask,
    updateTask,
  };
};

export default useTaskApi;
