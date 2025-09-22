import { getTasksByUser, type TaskResponse } from '../api/apiTask';
import useRequest from './useRequest';

const useTaskApi = () => {
  const { run, isLoading, isError, error } = useRequest();

  const getTasks = () => run<TaskResponse>(getTasksByUser);

  return { isLoading, isError, error, getTasks };
};

export default useTaskApi;
