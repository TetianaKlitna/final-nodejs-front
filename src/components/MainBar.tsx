import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import SignInDialogButton from './auth/dialogs/SignInDialogButton';
import SignUpDialogButton from './auth/dialogs/SignUpDialogButton';

const menuItems = [
  { id: 1, text: 'TODAY', router: '/' },
  { id: 2, text: 'FORECAST', router: '/forecast' },
  { id: 3, text: 'FAVORITIES', router: '/favorities' },
];


const MainBar = () => {

  return (
    <header>
      <AppBar position="fixed">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            component="div"
            fontWeight={700}
            color="primary.secondary"
          >
            WEATHER HUB
          </Typography>

          <List sx={{ display: 'flex' }}>
            {menuItems.map((menuItem) => {
              return (
                <ListItem key={menuItem.id}>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText>{menuItem.text}</ListItemText>
                </ListItem>
              );
            })}
          </List>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <SignUpDialogButton />
            <SignInDialogButton />
          </Box>
        </Toolbar>
      </AppBar>
    </header>
  );

};

export default MainBar;
