import { Button, Container, Stack, Typography } from '@mui/material';
import React from 'react';

const SectionFour = () => {
  return (
    <Container>
      <Stack alignItems="center" sx={{ py: 6, maxWidth: '70rem', m: 'auto' }}>
        <Typography sx={{ mb: 4 }} variant="h5" component="h5">
          Start using our services today
        </Typography>
        <Typography
          sx={{ textAlign: 'center', mb: 2 }}
          variant="body1"
          component="p"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis
          repudiandae minus ipsam velit eveniet consequatur! Voluptates
          molestiae assumenda illo deleniti quis unde ducimus labore accusantium
          voluptatibus maxime? Quibusdam.
        </Typography>

        <Button variant="contained" color="secondary">
          Enroll Now
        </Button>
      </Stack>
    </Container>
  );
};

export default SectionFour;
