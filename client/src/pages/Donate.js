import { Box, Container, Stack, Typography } from '@mui/material';
import React from 'react';
import { colors } from '../constants/colors';
import qr from '../assets/images/donate-qrcode.png';
import Background from './Background';

const Donate = () => {
  return (
    <>
      <Background />
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Typography variant="h4" colors={colors.dark}>
          Support Our Free Platform, Ignite a World of Learning
        </Typography>
        <Typography variant="body1" sx={{ my: 2 }}>
          Your donation helps sustain our free platform, providing quality
          resources to agricultural students across India. Together, we can
          ensure equal access to education and empower learners to reach their
          full potential. Join us in making a lasting impact on the future of
          education through your generous support.
        </Typography>
        <Stack alignItems="center">
          <Box
            sx={{ maxWidth: '34rem', mx: 'auto' }}
            component="img"
            src={qr}
            alt="qr"
          />
        </Stack>
      </Container>
    </>
  );
};

export default Donate;
