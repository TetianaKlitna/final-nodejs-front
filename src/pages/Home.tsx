import { Box, Typography, Stack } from '@mui/material';

export default function Home() {
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundImage: 'url("/todo-bg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        overflow: 'hidden',
      }}
    >
      <Stack spacing={2} textAlign="center"  
      sx={{ mt: '30vh' }}>
        <Typography variant="h3" fontWeight={700} color="primary">
          Welcome to Task Manager
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Stay organized, stay focused, and achieve your goals.
        </Typography>
      </Stack>
    </Box>
  );
}
