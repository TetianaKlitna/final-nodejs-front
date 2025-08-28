import DialogButtonWrapper from './DialogButtonWrapper';
import SignIn from '../forms/SignIn';
import LoginIcon from '@mui/icons-material/Login';

const SignInDialogButton = () => {
  return (
    <DialogButtonWrapper
      Icon={<LoginIcon />}
      title="Sign In"
      Component={SignIn}
    />
  );
};

export default SignInDialogButton;
