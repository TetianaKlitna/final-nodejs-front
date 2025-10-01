import DialogWrapper from '../../dialogs/DialogWrapper';
import ForgotPassword from '../forms/ForgotPassword';

const ForgotPaswordDialog = () => {
  return (
    <DialogWrapper
      title="Forgot Password"
      Component={ForgotPassword}
      path="/forgotPassword"
      returnTo="/login"
    />
  );
};

export default ForgotPaswordDialog;
