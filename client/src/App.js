import { createTheme, Snackbar, ThemeProvider } from '@mui/material';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';

//redux imports
import { useDispatch, useSelector } from 'react-redux';

// Landing page imports
import Layout from './pages/LandingPage/Layout';
import Home from './pages/LandingPage/Home/Home';
import Pricing from './pages/LandingPage/Pricing';
import AboutUs from './pages/LandingPage/AboutUs';
import ContactUs from './pages/LandingPage/ContactUs';

// Auth imoports
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';

// Dashboard imports
import Dashboard from './pages/Dashboard/Dashboard';
import Report from './pages/Dashboard/Report/Report';
import Quiz from './pages/Dashboard/Quiz/Quiz';
import TransitionsModal from './test/Test';
import Admin from './pages/Admin/Admin';
import User from './pages/Admin/User';
import Tutor from './pages/Admin/Tutor';
import Questions from './pages/Admin/Questions';
import { hideAlert } from './redux/alert-reducer';

// App wide Theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#25bf77',
      contrastText: '#E8E6E6',
    },
    secondary: {
      main: '#da4088',
      contrastText: '#fff',
    },
    btnWhiteOutlined: {
      main: '#ccc',
      contrastText: '#ccc',
    },
  },
  typography: {
    htmlFontSize: 10,
    fontFamily: [
      'Ubuntu',
      'Cantarell',
      'Fira Sans',
      'Droid Sans',
      'Helvetica Neue',
      'sans-serif',
    ].join(','),
  },
});

function App() {
  const { open, message } = useSelector(state => state.alert);
  const auth = useSelector(state => state.auth.token);
  const dispatch = useDispatch();

  const closeHandler = () => {
    dispatch(hideAlert());
  };

  const router = createBrowserRouter([
    {
      // Landing page route
      path: '/',
      element: !auth ? (
        <Layout />
      ) : (
        <Navigate to={'/dashboard'} replace={true} />
      ),

      children: [
        { index: true, element: <Home /> },
        {
          path: 'pricing',
          element: <Pricing />,
        },
        {
          path: 'about_us',
          element: <AboutUs />,
        },
        {
          path: 'contact',
          element: <ContactUs />,
        },
      ],
    },

    // Auth route
    {
      path: '/login',
      element: !auth ? (
        <Login />
      ) : (
        <Navigate to={'/dashboard'} replace={true} />
      ),
    },
    {
      path: '/register',
      element: !auth ? (
        <SignUp />
      ) : (
        <Navigate to={'/dashboard'} replace={true} />
      ),
    },

    // Dashboard route
    {
      path: '/dashboard',
      element: auth ? <Dashboard /> : <Navigate to={'/'} replace={true} />,
    },
    {
      path: '/quiz',
      element: <Quiz />,
    },
    {
      path: '/report',
      element: <Report />,
    },
    {
      path: '/test',
      element: <TransitionsModal />,
    },

    // admin route
    {
      path: '/admin',
      element: <Admin />,
      children: [
        { index: true, element: <User /> },

        {
          path: 'user',
          element: <User />,
        },
        {
          path: 'tutor',
          element: <Tutor />,
        },

        {
          path: 'questions',
          element: <Questions />,
        },
      ],
    },
  ]);

  return (
    <ThemeProvider theme={theme}>
      <Snackbar
        open={open}
        onClose={closeHandler}
        message={message}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
