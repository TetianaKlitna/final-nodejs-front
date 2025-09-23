import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import type { TaskDTO } from '../../types';
import { useNavigate } from 'react-router-dom';

const priorityColors: Record<'Low' | 'Medium' | 'High', string> = {
  Low: 'success.main',
  Medium: 'warning.main',
  High: 'error.main',
};

const TaskCard = (task: TaskDTO) => {
  const navigate = useNavigate();

  const handleOnView = () => {
    navigate(`${task.taskId}`);
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" component="div">
          {task?.title}
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 1 }}>
          Due date: {new Date(task?.dueDate).toLocaleDateString()}
        </Typography>
        <Typography
          sx={{ color: priorityColors[task?.priority], fontWeight: 600 }}
        >
          Priority: {task?.priority}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleOnView}>
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default TaskCard;
