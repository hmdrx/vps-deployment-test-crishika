import Box from '@mui/material/Box';
import { Container } from '@mui/material';

const DashboardBg = ({ children }) => {
  return (
    <Container disableGutters>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          width: '100vw',
          background: 'linear-gradient(#b8f1d6,#25bf77)',
          zIndex: '-9999',
        }}
      >
        <Box
          sx={{
            position: 'inherit',
            right: '5%',
            top: '25%',
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: '#25bf77',
            boxShadow: '0px 0px 5px 5px rgba(37,191,119,1)',
          }}
        />
        <Box
          sx={{
            position: 'inherit',
            top: '10%',
            left: '20%',
            width: 180,
            height: 180,
            borderRadius: '50%',
            background: '#25bf77',
            boxShadow: '0px 0px 5px 5px rgba(37,191,119,1)',
          }}
        />
        <Box
          sx={{
            position: 'inherit',
            bottom: 0,
            width: 280,
            height: 280,
            borderRadius: '50%',
            background: '#25bf77',
            boxShadow: '0px 0px 5px 5px rgba(37,191,119,1)',
          }}
        />
      </Box>
      {children}
    </Container>
  );
};

export default DashboardBg;
