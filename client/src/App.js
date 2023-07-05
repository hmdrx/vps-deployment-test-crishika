import { createTheme, ThemeProvider } from '@mui/material';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Donate from './pages/Donate';

// Landing page imports
import Layout from './pages/Layout';
import Main from './pages/Main';
import PrivacyPolicy from './pages/PrivacyPolicy';

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
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <Main /> },
        {
          path: 'privacy-policy',
          element: <PrivacyPolicy />,
        },
        {
          path: 'donation',
          element: <Donate />,
        },
      ],
    },
  ]);

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
