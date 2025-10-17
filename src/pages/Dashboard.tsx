import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { PieChart } from '@mui/x-charts/PieChart'
import LoadingWrapper from '../components/loading/LoadingWrapper'
import useTaskApi from '../hooks/useTaskApi'
import { useTheme } from '@mui/material/styles'
import { STATUS } from '../constants/Status'
import type { TaskDTO } from '../types'
import { getAccessToken } from '../api/tokenStore'

const socket = io(import.meta.env.VITE_APP_URL, {
  auth: {
    token: getAccessToken()
  },
  transportOptions: {
    polling: {
      withCredentials: true
    }
  }
})

const Dashboard = () => {
  const theme = useTheme()

  const { isLoading, isError, error, getAllTasks } = useTaskApi()
  const [tasks, setTasks] = useState<TaskDTO[]>([])
  const [todoCount, setTodoCount] = useState(0)
  const [progressCount, setProgressCount] = useState(0)
  const [doneCount, setDoneCount] = useState(0)

  const updateCount = (status: string, delta: number) => {
    if (!status) return
    switch (status) {
      case STATUS.TODO:
        setTodoCount(p => p + delta)
        break
      case STATUS.IN_PROGRESS:
        setProgressCount(p => p + delta)
        break
      case STATUS.DONE:
        setDoneCount(p => p + delta)
        break
    }
  }

  const handleCreated = (createdTask: TaskDTO) => {
    setTasks(prev => [...prev, createdTask])
    updateCount(createdTask.status, 1)
  }

  const handleUpdated = (updatedTask: TaskDTO) => {
    const prevTask = tasks.find(task => task.taskId === updatedTask.taskId)
    setTasks(prev =>
      prev.map(task =>
        task.taskId === updatedTask.taskId ? updatedTask : task
      )
    )
    if (prevTask && prevTask.status !== updatedTask.status) {
      updateCount(prevTask.status, -1)
      updateCount(updatedTask.status, +1)
    }
  }
  const handleDeleted = (deletedTask: TaskDTO) => {
    setTasks(prev => prev.filter(task => task.taskId !== deletedTask.taskId))
    updateCount(deletedTask.status, -1)
  }
  useEffect(() => {
    const fetchTasks = async () => {
      const res = await getAllTasks()
      const taskData: TaskDTO[] = res.tasks ?? []
      setTasks(taskData)
    }
    fetchTasks()
  }, [])

  useEffect(() => {
    const init = tasks.reduce(
      (acc, t) => {
        if (t.status === STATUS.TODO) acc.todoCount++
        else if (t.status === STATUS.IN_PROGRESS) acc.progressCount++
        else if (t.status === STATUS.DONE) acc.doneCount++
        return acc
      },
      { todoCount: 0, progressCount: 0, doneCount: 0 }
    )

    setTodoCount(init.todoCount)
    setProgressCount(init.progressCount)
    setDoneCount(init.doneCount)

    socket.on('connect', () => console.log('socket connected', socket.id))
    socket.on('connect_error', (err: unknown) =>
      console.error('connect_error', err)
    )
    socket.on('task:created', handleCreated)
    socket.on('task:updated', handleUpdated)
    socket.on('task:deleted', handleDeleted)

    return () => {
      socket.off('connect')
      socket.off('connect_error')
      socket.off('task:created', handleCreated)
      socket.off('task:updated', handleUpdated)
      socket.off('task:deleted', handleDeleted)
    }
  }, [tasks])

  return (
    <LoadingWrapper isLoading={isLoading} isError={isError} error={error}>
      <Card variant='outlined' sx={{ width: '50%' }}>
        <CardContent>
          <Typography variant='h6' gutterBottom>
            Task Status Overview
          </Typography>
          <PieChart
            series={[
              {
                data: [
                  {
                    id: 0,
                    value: todoCount,
                    label: STATUS.TODO,
                    color: theme.palette.error.main
                  },
                  {
                    id: 1,
                    value: progressCount,
                    label: STATUS.IN_PROGRESS,
                    color: theme.palette.warning.main
                  },
                  {
                    id: 2,
                    value: doneCount,
                    label: STATUS.DONE,
                    color: theme.palette.success.main
                  }
                ]
              }
            ]}
            width={400}
            height={200}
          />
        </CardContent>
      </Card>
    </LoadingWrapper>
  )
}

export default Dashboard
