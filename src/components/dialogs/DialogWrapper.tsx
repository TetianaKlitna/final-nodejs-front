import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate, useLocation, matchPath } from 'react-router-dom';
import type { ElementType } from 'react';

type DialogWrapperProps = {
  title: string;
  Component: ElementType;
  path: string;
  returnTo?: string;
};

const DialogWrapper = ({
  title,
  Component,
  path,
  returnTo = '/',
}: DialogWrapperProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const open = Boolean(matchPath({ path, end: true }, location.pathname));

  console.log(open, location.pathname, path);

  const handleClose = () => navigate(returnTo);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <Box sx={{ position: 'absolute', right: 5, top: 5 }}>
        <IconButton aria-label="close" onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>
        <Component />
      </DialogContent>
    </Dialog>
  );
};

export default DialogWrapper;
