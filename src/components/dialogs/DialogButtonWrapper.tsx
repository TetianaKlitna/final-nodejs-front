import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate, useLocation } from 'react-router-dom';
import type { ReactNode, ElementType } from 'react';

type DialogWrapperProps = {
  Icon: ReactNode;
  title: string;
  Component: ElementType;
  path: string;
};

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
        <Box display="flex" flexDirection="row" gap={1} alignItems="center">
          {Icon}
          {title && <Typography variant="body1">{title}</Typography>}
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
