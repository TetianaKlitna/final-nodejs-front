import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Footer = () => {
  return (
    <AppBar position="fixed" color="default" 
    sx={{   
        top: 'auto',
        bottom: 0,
      }}>
      <Toolbar sx={{ justifyContent: 'center' }}>
        <Box>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} <strong>NextTask Manager</strong>.
            Turning chaos into checkmarks. Powered by <strong>Tetiana Klitna</strong>.
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
