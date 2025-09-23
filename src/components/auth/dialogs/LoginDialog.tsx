import DialogWrapper from '../../dialogs/DialogWrapper';
import Login from '../forms/Login';

const LoginDialog = () => {
  return <DialogWrapper title="Login" Component={Login} path="/login" />;
};

export default LoginDialog;
