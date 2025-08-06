import { Outlet } from 'react-router-dom';
import MainBar from '../components/MainBar';

const MainLayout = () => {
  return (
    <>
      <header>
        <MainBar />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
