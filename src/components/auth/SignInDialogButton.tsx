import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import SignIn from './SignIn';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

const SignInDialogButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)} color="inherit" size="large">
        <Box display="flex" flexDirection="row" gap={1}>
          <LoginIcon />
          <Typography variant="body1">Sign In</Typography>
        </Box>
      </Button>
      <Dialog open={open}>
        <Box sx={{ position: 'absolute', right: 5, top: 5 }}>
          <IconButton aria-label="close" onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogTitle />
        <DialogContent>
          <SignIn />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SignInDialogButton;
