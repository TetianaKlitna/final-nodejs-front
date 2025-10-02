import { useState, type FormEvent } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import useAuthApi from '../../../hooks/useAuthApi';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import ErrorAlert from '../../alerts/ErrorAlert';
import SuccessAlert from '../../alerts/SuccessAlert';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const email = searchParams.get('email') || '';

  const { isLoading, isError, error, resetPasswordUser } = useAuthApi();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorFormMsg, setErrorFormMsg] = useState('');
  const [successFormMsg, setSuccessFormMsg] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setErrorFormMsg('Passwords do not match.');
      return;
    }
    setErrorFormMsg('');

    const success = await resetPasswordUser(token, email, password);
    if (success) {
      setSuccessFormMsg('Password changed! Redirecting to login...');
      setTimeout(() => navigate('/login', { replace: true }), 2000);
    }
  };

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
                    {showPassword ? <Visibility /> : <VisibilityOff />}
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
                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      </FormControl>
      <Button type="submit" fullWidth variant="contained" disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Reset'}
      </Button>
      {errorFormMsg && <ErrorAlert message={errorFormMsg} />}
      {isError && <ErrorAlert message={error} />}
      {successFormMsg && <SuccessAlert message={successFormMsg} />}
    </Box>
  );
};

export default ResetPassword;
