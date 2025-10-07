import Box from '@mui/material/Box';
import TasksBoard from '../components/tasks/TasksBoard';

const Tasks = () => {
  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>    
        <TasksBoard />
    </Box>
  );
};

export default Tasks;
