import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { useEffect, useState, type FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import useTaskApi from '../../../hooks/useTaskApi';
import LoadingWrapper from '../../loading/LoadingWrapper';
import {
  STATUS,
  PRIORITY,
  type Status,
  type Priority,
} from '../../../constants';
import type { Task } from '../../../types';

const TaskForm = () => {
  const { id: taskId } = useParams();
  const isCreate = taskId === 'new';
  const { isLoading, isError, error, getTask, createTask } = useTaskApi();

  useEffect(() => {
    const fetchTask = async () => {
      const res = await getTask(taskId!);
      const task = res.task;
      setTitle(task.title);
      setDueDate(task.dueDate);
      setDescription(task.description);
      setStatus(task.status);
      setPriority(task.priority);
    };

    if (!taskId || isCreate) return;

    fetchTask();
  }, []);

  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<Status>(STATUS.TODO);
  const [priority, setPriority] = useState<Priority>(PRIORITY.MEDIUM);

  const handleOnSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isCreate) {
      const task: Task = { title, dueDate, description, status, priority };
      await createTask(task);
    }
  };
  return (
    <LoadingWrapper isLoading={isLoading} isError={isError} error={error}>
      <Box
        component="form"
        onSubmit={handleOnSubmit}
        display="flex"
        flexDirection="column"
        gap={3}
      >
        <FormControl fullWidth>
          <FormLabel htmlFor="title" required>
            Title
          </FormLabel>
          <TextField
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </FormControl>

        <FormControl fullWidth>
          <FormLabel htmlFor="dueDate" required>
            Due Date
          </FormLabel>
          <TextField
            id="dueDate"
            name="dueDate"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </FormControl>

        <FormControl fullWidth>
          <FormLabel htmlFor="status">Status</FormLabel>
          <TextField
            id="status"
            name="status"
            select
            value={status}
            onChange={(e) => setStatus(e.target.value as Status)}
          >
            {Object.values(STATUS).map((s) => (
              <MenuItem key={s} value={s}>
                {s}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>

        <FormControl fullWidth>
          <FormLabel htmlFor="priority">Priority</FormLabel>
          <TextField
            id="priority"
            name="priority"
            select
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
          >
            {Object.values(PRIORITY).map((p) => (
              <MenuItem key={p} value={p}>
                {p}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>

        <FormControl fullWidth>
          <FormLabel htmlFor="description">Description</FormLabel>
          <TextField
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={3}
          />
        </FormControl>

        <Button type="submit" variant="contained" color="primary">
          {isCreate ? 'Add' : 'Save'} Task
        </Button>
      </Box>
    </LoadingWrapper>
  );
};

export default TaskForm;
