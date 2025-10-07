import { Outlet } from 'react-router-dom';
import MainBar from '../components/MainBar';
import Footer from '../components/Footer';
import Box from '@mui/material/Box';

const MainLayout = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh', 
        width: '100vw', 
        overflow: 'hidden',
      }}
    >
      <Box component="header">
        <MainBar />
      </Box>
      <Box component="main" sx={{ flex: '1 1 auto', overflow: 'hidden' }}>
        <Outlet />
      </Box>
      <Box component="footer">
        <Footer />
      </Box>
    </Box>
  );
};

export default MainLayout;
