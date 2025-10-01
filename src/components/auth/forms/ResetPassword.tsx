import { useState } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = () => {};

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        gap: 1,
      }}
    >
      <FormControl>
        <FormLabel htmlFor="password" required>
          Password:
        </FormLabel>
        <TextField
          id="password"
          type={showPassword ? 'text' : 'password'}
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="••••••"
          required
          fullWidth
          autoFocus
          color="primary"
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      </FormControl>
      <FormControl sx={{ flex: 1 }}>
        <FormLabel htmlFor="confirmPassword" required>
          Confirm Password
        </FormLabel>
        <TextField
          id="confirmPassword"
          type={showConfirmPassword ? 'text' : 'password'}
          name="confirmPassword"
          required
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          placeholder="••••••"
          fullWidth
          autoFocus
          color="primary"
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    edge="end"
                  >
                    {confirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      </FormControl>
      <Button type="submit" fullWidth variant="contained">
        {'Reset'}
      </Button>
    </Box>
  );
};

export default ResetPassword;
