import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const ErrorAlert = ({ message }: { message: string }) => {
  return (
    <Stack sx={{ width: '100%' }}>
      <Alert severity="error">{message}</Alert>
    </Stack>
  );
};

export default ErrorAlert;
