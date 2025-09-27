import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import TaskIcon from '@mui/icons-material/Task';
import { useNavigate } from 'react-router-dom';

const TaskMenu = () => {
  const navigate = useNavigate();
  const addTask = () => {
    navigate('new');
  };
  return (
    <AppBar position="static" sx={{ mb: 3, borderRadius: 2 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TaskIcon color="inherit" />
          <Typography variant="h6"> Next Task</Typography>
        </Box>
        <Button color="inherit" onClick={addTask} startIcon={<AddIcon />}>
          Add Task
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default TaskMenu;
