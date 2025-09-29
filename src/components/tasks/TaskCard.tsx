import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import type { TaskDTO } from '../../types';
import { useNavigate } from 'react-router-dom';
import useTaskApi from '../../hooks/useTaskApi';
import ErrorAlert from '../alerts/ErrorAlert';

const priorityColors: Record<'Low' | 'Medium' | 'High', string> = {
  Low: 'success.main',
  Medium: 'warning.main',
  High: 'error.main',
};

type Props = TaskDTO & { onDeleted?: () => void };

const TaskCard = ({ taskId, title, dueDate, priority, onDeleted }: Props) => {
  const navigate = useNavigate();
  const { isLoading, isError, error, deleteTask } = useTaskApi();

  const handleOnView = () => {
    navigate(`${taskId}`);
  };

  const handleOnDelete = async () => {
    if (!taskId) return;
    await deleteTask(taskId);
    onDeleted?.();
  };

  return (
    <Card variant="outlined" sx={{ borderColor: priorityColors[priority] }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 1 }}>
          Due date: {new Date(dueDate).toLocaleDateString()}
        </Typography>
        <Typography sx={{ color: priorityColors[priority], fontWeight: 600 }}>
          Priority: {priority}
        </Typography>
      </CardContent>
      {isError && <ErrorAlert message={error} />}
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOnView}
          startIcon={<VisibilityIcon />}
        >
          Details
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={handleOnDelete}
          startIcon={<DeleteIcon />}
          disabled={isLoading}
        >
          {isLoading ? 'Deleting...' : 'Delete'}
        </Button>
      </CardActions>
    </Card>
  );
};

export default TaskCard;
