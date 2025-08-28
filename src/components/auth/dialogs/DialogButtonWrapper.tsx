import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { type DialogWrapperProps } from '../types/DialogWrapperProps';
import { useState } from 'react';

const DialogButtonWrapper = ({
  Icon,
  title,
  Component,
}: DialogWrapperProps) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} color="inherit" size="large">
        <Box display="flex" flexDirection="row" gap={1}>
          {Icon}
          <Typography variant="body1">{title}</Typography>
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
          <Component open={open} handleClose={handleClose} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DialogButtonWrapper;
