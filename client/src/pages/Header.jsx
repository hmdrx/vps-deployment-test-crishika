import React from 'react';
import { Box, Container } from '@mui/material';
import logo from '../assets/images/logo-text.png';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Box sx={{ bgcolor: '#25bf7770' }}>
      <Container>
        <Link onClick={() => window.scrollTo(0, 0)} to="/">
          <Box
            sx={{ maxWidth: '12rem', my: 4 }}
            component="img"
            src={logo}
            alt="logo"
          />
        </Link>
      </Container>
    </Box>
  );
};

export default Header;
