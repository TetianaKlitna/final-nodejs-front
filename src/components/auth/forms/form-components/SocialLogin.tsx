import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { GoogleIcon } from './CustomIcons'

const SocialLogin = () => {

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_APP_API_URL}/auth/google`
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Button
        fullWidth
        variant='outlined'
        onClick={handleGoogleLogin}
        startIcon={<GoogleIcon />}
      >
        Sign in with Google
      </Button>
    </Box>
  )
}

export default SocialLogin
