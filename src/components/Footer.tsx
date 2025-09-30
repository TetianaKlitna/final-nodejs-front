import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Footer = () => {
  return (
    <AppBar position="static" color="default" sx={{ mt: 4 }}>
      <Toolbar sx={{ justifyContent: 'center' }}>
        <Box>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} <strong>NextTask Manager</strong>. All
            rights reserved.
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
