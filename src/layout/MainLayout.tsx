import { Outlet } from 'react-router-dom';
import MainBar from '../components/MainBar';
import Box from '@mui/material/Box';

const MainLayout = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: '100vw',
      }}
    >
      <Box component="header" sx={{ flex: '0 0 10%' }}>
        <MainBar />
      </Box>
      <Box component="main" sx={{ flex: '1 1 90%', p: 2 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
