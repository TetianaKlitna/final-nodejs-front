import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { type DialogWrapperProps } from '../types/DialogWrapperProps';
import { useNavigate, useLocation } from 'react-router-dom';

const DialogButtonWrapper = ({
  Icon,
  title,
  Component,
  path,
}: DialogWrapperProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const open = location.pathname === path;

  const handleClose = () => navigate('/');

  return (
    <>
      <Button onClick={() => navigate(path)} color="inherit" size="large">
        <Box display="flex" flexDirection="row" gap={1}>
          {Icon}
          <Typography variant="body1">{title}</Typography>
        </Box>
      </Button>
      <Dialog open={open}>
        <Box sx={{ position: 'absolute', right: 5, top: 5 }}>
          <IconButton aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogTitle />
        <DialogContent>
          <Component />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DialogButtonWrapper;
