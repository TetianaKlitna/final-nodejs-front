import { getTasksByUser, getTaskData, type TaskResponse } from '../api/apiTask';
import useRequest from './useRequest';

const useTaskApi = () => {
  const { run, isLoading, isError, error } = useRequest();

  const getTasks = () => run<TaskResponse>(getTasksByUser);
  const getTask = (id: string) => run<TaskResponse>(() => getTaskData(id));

  return { isLoading, isError, error, getTasks, getTask };
};

export default useTaskApi;
