import { apiCall } from './api'
import type { TaskDTO, Task } from '../types'

export type TasksResponse = {
  tasks: TaskDTO[]
  count: number
}

export type TaskResponse = {
  task: TaskDTO
}

export const getTasksByUser = async (): Promise<TasksResponse> => {
  const res = await apiCall<TasksResponse>('get', '/tasks')
  return res
}

export const getAllTasksData = async (): Promise<TasksResponse> => {
  const res = await apiCall<TasksResponse>('get', '/tasks?all=true')
  return res
}

export const getTaskData = async (id: string): Promise<TaskResponse> => {
  const res = await apiCall<TaskResponse>('get', `/tasks/${id}`)
  return res
}

export const createTaskData = async (task: Task): Promise<TaskResponse> => {
  const res = await apiCall<TaskResponse>('post', '/tasks', task)
  return res
}

export const deleteTaskData = async (id: string): Promise<TaskResponse> => {
  const res = await apiCall<TaskResponse>('delete', `/tasks/${id}`)
  return res
}

export const updateTaskData = async (
  id: string,
  task: Partial<Task>
): Promise<TaskResponse> => {
  const res = await apiCall<TaskResponse>('patch', `/tasks/${id}`, task)
  return res
}
