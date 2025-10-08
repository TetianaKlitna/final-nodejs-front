import { useState, useEffect } from 'react'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TaskCard from './TaskCard'
import type { DragEvent } from 'react'
import useTaskApi from '../../hooks/useTaskApi'
import type { TaskDTO } from '../../types'
import LoadingWrapper from '../loading/LoadingWrapper'
import TaskMenu from './TaskMenu'
import { COL_TO_STATUS } from '../../constants'

type Column = { id: string; title: string; items: TaskDTO[] }

export default function TasksBoard () {
  const { isLoading, isError, error, getTasks, updateTask } = useTaskApi()
  const [board, setBoard] = useState<Column[]>([])

  const fetchTasks = async () => {
    const res = await getTasks()
    const tasks = res.tasks

    const todo = tasks.filter(t => t.status === 'To-Do')
    const inProgress = tasks.filter(t => t.status === 'In-Progress')
    const done = tasks.filter(t => t.status === 'Done')

    setBoard([
      { id: 'todo', title: 'To Do', items: todo },
      { id: 'inprogress', title: 'In Progress', items: inProgress },
      { id: 'done', title: 'Done', items: done }
    ])
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const onDragStart = (e: DragEvent, taskId: string, fromColId: string) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ taskId, fromColId }))
    e.dataTransfer.effectAllowed = 'move'
  }

  const onDragOver = (e: DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const onDrop = async (e: DragEvent, toColId: string) => {
    e.preventDefault()

    const raw = e.dataTransfer.getData('text/plain')

    if (!raw) return

    const { taskId, fromColId } = JSON.parse(raw) as {
      taskId: string
      fromColId: string
    }

    if (!taskId || !fromColId) return

    const prevBoard = board
    const targetStatus = COL_TO_STATUS[toColId]

    setBoard(prev => {
      const next = prev.map(status => ({ ...status, items: [...status.items] }))
      const fromCol = next.find(c => c.id === fromColId)
      const toCol = next.find(c => c.id === toColId)
      if (!fromCol || !toCol) return prev

      const idx = fromCol.items.findIndex(t => t.taskId === taskId)
      if (idx === -1) return prev

      const [moved] = fromCol.items.splice(idx, 1)
      toCol.items.push(moved)

      return next
    })

    console.log(taskId, targetStatus)
    const res = await updateTask(taskId, { status: targetStatus })
    console.log(res)
    if (isError) setBoard(prevBoard)
  }

  return (
    <>
      <TaskMenu />
      <LoadingWrapper isLoading={isLoading} isError={isError} error={error}>
        <Stack
          direction='row'
          spacing={2}
          sx={{ height: '70%', minHeight: 0, m: 2 }}
        >
          {board.map(col => (
            <Box
              key={col.id}
              sx={{
                flex: 1,
                minWidth: 250,
                p: 2,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
                bgcolor: 'background.paper',
                display: 'flex',
                flexDirection: 'column',
                minHeight: 0 // allow child to scroll
              }}
            >
              <Typography
                variant='h6'
                align='center'
                sx={{
                  mb: 1,
                  color: 'primary.main',
                  fontWeight: 700,
                  position: 'sticky',
                  top: 0,
                  zIndex: 1,
                  bgcolor: 'background.paper',
                  pb: 1,
                  borderBottom: '1px solid',
                  borderColor: 'divider'
                }}
              >
                {col.title}
              </Typography>

              <Box
                onDragOver={onDragOver}
                onDrop={e => onDrop(e, col.id)}
                sx={{
                  flex: 1,
                  minHeight: 0,
                  overflowY: 'auto',
                  pr: 1
                }}
              >
                {col.items.map(task => (
                  <Box
                    key={task.taskId}
                    sx={{ p: 1, mb: 1, cursor: 'grab' }}
                    draggable
                    onDragStart={e => onDragStart(e, task.taskId, col.id)}
                  >
                    <TaskCard {...task} onDeleted={fetchTasks} />
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        </Stack>
      </LoadingWrapper>
    </>
  )
}
