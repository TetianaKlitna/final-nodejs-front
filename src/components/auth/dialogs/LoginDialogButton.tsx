import DialogButtonWrapper from './DialogButtonWrapper';
import Login from '../forms/Login';
import LoginIcon from '@mui/icons-material/Login';

const LoginDialogButton = () => {
  return (
    <DialogButtonWrapper
      Icon={<LoginIcon />}
      title="Login"
      Component={Login}
      path="/login"
    />
  );
};

export default LoginDialogButton;
