import DialogWrapper from '../../dialogs/DialogWrapper';
import ResetPassword from '../forms/ResetPassword';

const ForgotPasswordDialog = () => {
  return (
    <DialogWrapper
      title="Reset Password"
      Component={ResetPassword}
      path="/resetPassword"
      returnTo="/login"
    />
  );
};

export default ForgotPasswordDialog;
