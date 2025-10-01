import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const handleSubmit = () => {};
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
      <Button type="submit" fullWidth variant="contained">
        {'Send'}
      </Button>
    </Box>
  );
};

export default ForgotPassword;
