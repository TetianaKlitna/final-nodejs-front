import { useState, type FormEvent } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ErrorAlert from '../../alerts/ErrorAlert';
import SuccessAlert from '../../alerts/SuccessAlert';
import useAuthApi from '../../../hooks/useAuthApi';

const ForgotPassword = () => {
  const { isLoading, isError, error, forgotPasswordUser } = useAuthApi();
  const [email, setEmail] = useState('');
  const [successFormMsg, setSuccessFormMsg] = useState('');
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const success = await forgotPasswordUser(email);
    if (success) {
      setSuccessFormMsg('A password reset email has been sent.');
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
        gap: 2,
      }}
    >
      <FormControl>
        <FormLabel htmlFor="email" required>
          Enter your email to reset your password:
        </FormLabel>

        <TextField
          id="email"
          type="text"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="your@email.com"
          variant="outlined"
          required
          fullWidth
          autoFocus
          color="primary"
        />
      </FormControl>
      <Button type="submit" fullWidth variant="contained" disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Send'}
      </Button>
      {isError && <ErrorAlert message={error} />}
      {successFormMsg && <SuccessAlert message={successFormMsg} />}
    </Box>
  );
};

export default ForgotPassword;
