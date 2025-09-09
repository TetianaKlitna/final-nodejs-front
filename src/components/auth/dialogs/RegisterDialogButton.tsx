import DialogButtonWrapper from './DialogButtonWrapper';
import SignUpIcon from '@mui/icons-material/PersonAdd';
import Register from '../forms/Register';

const RegisterDialogButton = () => {
  return (
    <DialogButtonWrapper
      Icon={<SignUpIcon />}
      title="Register"
      Component={Register}
      path="/register"
    />
  );
};

export default RegisterDialogButton;
