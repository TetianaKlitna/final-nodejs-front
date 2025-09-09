import MainLayout from './layout/MainLayout';
import LoginDialogButton from './components/auth/dialogs/LoginDialogButton';
import RegisterDialogButton from './components/auth/dialogs/RegisterDialogButton';
import ProtectedRoute from './routers/ProtectedRoute';
import { AuthProvider } from './context/AuthProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy } from 'react';
import './App.css';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Tasks = lazy(() => import('./pages/Tasks'));
const Task = lazy(() => import('./pages/Task'));

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="register" element={<RegisterDialogButton />} />
            <Route path="login" element={<LoginDialogButton />} />
            <Route element={<ProtectedRoute />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="tasks" element={<Tasks />} />
              <Route path="task" element={<Task />} />
            </Route>
            <Route path="*" element={<p>Page Not Found</p>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
