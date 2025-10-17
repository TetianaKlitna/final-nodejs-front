import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { NavLink } from 'react-router-dom'
import LoginDialogButton from './auth/dialogs/LoginDialogButton'
import RegisterDialogButton from './auth/dialogs/RegisterDialogButton'
import Logout from '../components/auth/forms/Logout'
import { useAuth } from '../context/AuthContext'

const menuItems = [
  { id: 0, text: 'Home', to: '/' },
  { id: 1, text: 'Tasks', to: '/tasks' },
  { id: 2, text: 'Dashboard', to: '/dashboard' }
]

const MainBar = () => {
  const { user, token } = useAuth()

  return (
    <AppBar position='static' color='default'>
      <Toolbar sx={{ gap: 2 }}>
        <Stack direction='row' spacing={1} sx={{ mr: 2 }}>
          {menuItems.map(({ id, text, to }) => (
            <Button
              key={id}
              component={NavLink}
              to={to}
              variant='text'
              color='inherit'
              sx={{
                '&.active': {
                  fontWeight: 700,
                  borderBottom: '2px solid',
                  borderColor: 'primary.main',
                  borderRadius: 0
                }
              }}
            >
              <Typography variant='body1'>{text}</Typography>
            </Button>
          ))}
        </Stack>
        <Box sx={{ flexGrow: 1 }} />
        <Stack direction='row' spacing={2} alignItems='center'>
          {user && token ? (
            <>
              <Typography variant='body1' sx={{ color: 'text.secondary' }}>
                Welcome, <strong>{user}</strong>
              </Typography>
              <Logout />
            </>
          ) : (
            <>
              <RegisterDialogButton />
              <LoginDialogButton />
            </>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  )
}

export default MainBar
