import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#075B5E',
      contrastText: '#FFFCFB',
    },
    secondary: {
      main: '#093FB4',
    },
    background: {
      default: '#FFFCFB',
      paper: '#FFFCFB',
    },
  },
});

export default theme;
