import DialogButtonWrapper from './DialogButtonWrapper';
import SignUpIcon from '@mui/icons-material/PersonAdd';
import SignUp from '../forms/SignUp';

const SignUpDialogButton = () => {
  return (
    <DialogButtonWrapper
      Icon={<SignUpIcon />}
      title="Sign Up"
      Component={SignUp}
    />
  );
};

export default SignUpDialogButton;
