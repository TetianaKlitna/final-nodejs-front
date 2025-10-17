import { useEffect, useState, useCallback } from 'react'
import socket from '../socket'
import Stack from '@mui/material/Stack'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import LoadingWrapper from '../components/loading/LoadingWrapper'
import useTaskApi from '../hooks/useTaskApi'
import type { TaskDTO } from '../types'
import PieChartStatus from '../components/charts/PieChartStatus'
import BarChartPriority from '../components/charts/BarChartPriority'

const Dashboard = () => {
  const { isLoading, isError, error, getAllTasks } = useTaskApi()
  const [tasks, setTasks] = useState<TaskDTO[]>([])

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await getAllTasks()
      const taskData: TaskDTO[] = res.tasks ?? []
      setTasks(taskData)
    }
    fetchTasks()
  }, [])

  const handleCreated = useCallback(
    (createdTask: TaskDTO) => {
      setTasks(prev => [...prev, createdTask])
    },
    [setTasks]
  )

  const handleUpdated = useCallback(
    (updatedTask: TaskDTO) => {
      setTasks(prev => {
        const prevTask = prev.find(t => t.taskId === updatedTask.taskId)
        if (!prevTask) return prev
        return prev.map(t =>
          t.taskId === updatedTask.taskId ? updatedTask : t
        )
      })
    },
    [setTasks]
  )

  const handleDeleted = useCallback(
    (deletedTask: TaskDTO) => {
      setTasks(prev => prev.filter(t => t.taskId !== deletedTask.taskId))
    },
    [setTasks]
  )

  useEffect(() => {
    const onConnect = () => console.log('socket connected', socket.id)
    const onConnectError = (err: unknown) => console.error('connect_error', err)

    socket.on('connect', onConnect)
    socket.on('connect_error', onConnectError)
    socket.on('task:created', handleCreated)
    socket.on('task:updated', handleUpdated)
    socket.on('task:deleted', handleDeleted)

    return () => {
      socket.off('connect', onConnect)
      socket.off('connect_error', onConnectError)
      socket.off('task:created', handleCreated)
      socket.off('task:updated', handleUpdated)
      socket.off('task:deleted', handleDeleted)
    }
  }, [handleCreated, handleUpdated, handleDeleted])

  return (
    <LoadingWrapper isLoading={isLoading} isError={isError} error={error}>
      <Stack direction='row' sx={{ width: '100%' }}>
        <Card variant='outlined' sx={{ flex: 1 }}>
          <CardContent>
            <PieChartStatus tasks={tasks} />
          </CardContent>
        </Card>

        <Card variant='outlined' sx={{ flex: 1 }}>
          <CardContent>
            <BarChartPriority tasks={tasks} />
          </CardContent>
        </Card>
      </Stack>
    </LoadingWrapper>
  )
}

export default Dashboard
