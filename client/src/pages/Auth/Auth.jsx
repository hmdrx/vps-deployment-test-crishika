import React from 'react';
import { Box, Container, Divider, Typography } from '@mui/material';

import classes from './Auth.module.css';

import { Stack } from '@mui/material';
import { Link } from 'react-router-dom';
const logo = require('../../assets/images/logo-512.png');

const Auth = ({ icon, greetingText, link, linkText, children }) => {


  return (
    <Box className={classes.anima}>
      <Container disableGutters>
        <Stack direction='row'  justifyContent= 'center'
            alignItems= { {md: 'center'} }
          sx={{
            minHeight: window.innerHeight,
            display: 'flex',
           
          }}
        >
          <Stack
            direction={{ sm: 'row' }}
            divider={<Divider orientation="vertical" flexItem />}
            spacing={{ xs: 2, md: 4 }}
            p={4}
            py={{ xs: 2, md: 4}}
            sx={{
              borderRadius: 1,
              overflow: 'hidden',
              bgcolor: '#ffffff7e',
              backdropFilter: 'blur(3rem)',
            }}
          >
            <Stack alignItems="center">
              <Box component="img" sx={{ width: '8.5rem' }} src={logo} />
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  color: 'primary.main',
                }}
              >
                Crishika
              </Typography>
              <Typography mt={2}>{greetingText}</Typography>
              <Box
                component="img"
                mt={4}
                sx={{ maxWidth: '100%', display: { xs: 'none', sm: 'block' } }}
                src={icon}
              />
            </Stack>
            <Stack justifyContent="space-between">
              {children}
              <Typography mt={4} variant="body2">
                {linkText}
                <Link to={`/${link}`} color="info.main">
                  {link}
                </Link>
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Auth;
