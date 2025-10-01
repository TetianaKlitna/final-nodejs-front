import MainLayout from './layout/MainLayout';
import LoginDialog from './components/auth/dialogs/LoginDialog';
import RegisterDialog from './components/auth/dialogs/RegisterDialog';
import ForgotPaswordDialog from './components/auth/dialogs/ForgotPaswordDialog';
import ResetPaswordDialog from './components/auth/dialogs/ResetPasswordDialog';
import ProtectedRoute from './routers/ProtectedRoute';
import { AuthProvider } from './context/AuthProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy } from 'react';
import './App.css';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Tasks = lazy(() => import('./pages/Tasks'));
const TaskDialog = lazy(() => import('./components/tasks/dialogs/TaskDialog'));

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="register" element={<RegisterDialog />} />
            <Route path="login" element={<LoginDialog />} />
            <Route path="forgotPassword" element={<ForgotPaswordDialog />} />
            <Route path="resetPassword" element={<ResetPaswordDialog />} />
            <Route element={<ProtectedRoute />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="tasks" element={<Tasks />} />
              <Route path="tasks/:id" element={<TaskDialog />} />
            </Route>
            <Route path="*" element={<p>Page Not Found</p>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
