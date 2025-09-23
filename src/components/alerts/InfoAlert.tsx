import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const InfoAlert = ({ message }: { message: string }) => {
  return (
    <Stack sx={{ width: '100%', mb: 2 }}>
      <Alert severity="info">{message}</Alert>
    </Stack>
  );
};

export default InfoAlert;
