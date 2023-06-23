import { Outlet } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Bg from './Bg/Bg';

const Layout = () => {
  return (
    <>
      <Bg />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
