import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useEffect, useState, type FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import useTaskApi from '../../../hooks/useTaskApi';
import LoadingWrapper from '../../loading/LoadingWrapper';
import SuccessAlert from '../../alerts/SuccessAlert';
import {
  STATUS,
  PRIORITY,
  PRIORITY_COLORS,
  type Status,
  type Priority,
} from '../../../constants';
import type { Task } from '../../../types';
import { utcToDateInput, dateInputToUtc } from '../../../utils';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<Status>(STATUS.TODO);
  const [priority, setPriority] = useState<Priority>(PRIORITY.MEDIUM);

  const { id: taskId } = useParams();
  const isCreate = taskId === 'new';
  const { isLoading, isError, error, getTask, createTask, updateTask } =
    useTaskApi();
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    const fetchTask = async () => {
      const res = await getTask(taskId!);
      const task = res.task;
      const dateFromUTC = utcToDateInput(task.dueDate);
      setTitle(task.title);
      setDueDate(dateFromUTC);
      setDescription(task.description);
      setStatus(task.status);
      setPriority(task.priority);
    };

    if (!taskId || isCreate) return;

    fetchTask();
  }, []);

  const handleOnSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const dateToUTC = dateInputToUtc(dueDate);
    const task: Task = {
      title,
      dueDate: dateToUTC,
      description,
      status,
      priority,
    };

    if (isCreate) {
      await createTask(task);
      setSuccessMsg('Task created successfully.');
      setTitle('');
      setDueDate('');
      setDescription('');
      setStatus(STATUS.TODO);
      setPriority(PRIORITY.MEDIUM);
    } else {
      await updateTask(taskId!, task);
      setSuccessMsg('Task updated successfully.');
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

        <Stack direction="row" spacing={2}>
          <FormControl sx={{ flex: 1 }}>
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

          <FormControl sx={{ flex: 1 }}>
            <FormLabel htmlFor="priority">Priority</FormLabel>
            <TextField
              id="priority"
              name="priority"
              select
              value={priority}
              onChange={(e) => setPriority(e.target.value as Priority)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: PRIORITY_COLORS[priority],
                  },
                  "&:hover fieldset": {
                    borderColor: PRIORITY_COLORS[priority],
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: PRIORITY_COLORS[priority],
                  },
                },
              }}
            >
              {Object.values(PRIORITY).map((p) => (
                <MenuItem key={p} value={p}>
                  {p}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
        </Stack>

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
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isLoading}
        >
          {isCreate ? 'Add' : 'Save'} Task
        </Button>
        {successMsg && <SuccessAlert message={successMsg} />}
      </Box>
    </LoadingWrapper>
  );
};

export default TaskForm;
