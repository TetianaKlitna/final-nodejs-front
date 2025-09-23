import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import { useState, type FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import useTaskApi from '../../../hooks/useTaskApi';
import LoadingWrapper from '../../loading/LoadingWrapper';

const TaskForm = () => {
  const { taskId } = useParams();
  const { isLoading, isError, error, getTask } = useTaskApi();
  const [title, setTitle] = useState('');

  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  return (
    <LoadingWrapper isLoading={isLoading} isError={isError} error={error}>
      <Box component="form" onSubmit={handleOnSubmit}>
        <FormControl>
          <FormLabel htmlFor="title" required>
            Title:
          </FormLabel>
          <TextField
            id="title"
            name="title"
            fullWidth
            required
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            color="primary"
          />
        </FormControl>
      </Box>
    </LoadingWrapper>
  );
};

export default TaskForm;
