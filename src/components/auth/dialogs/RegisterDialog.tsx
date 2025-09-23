import DialogWrapper from '../../dialogs/DialogWrapper';
import Register from '../forms/Register';

const RegisterDialog = () => {
  return (
    <DialogWrapper title="Register" Component={Register} path="/register" />
  );
};

export default RegisterDialog;
