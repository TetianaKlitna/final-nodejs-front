import MainLayout from './layout/MainLayout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element=<MainLayout />>
          <Route path="*" element=<p>Page Not Found</p>></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
