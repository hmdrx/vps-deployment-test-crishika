import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';

const SectionFive = () => {
  return (
    <Container>
      <Box sx={{ py: 6, textAlign: 'center', maxWidth: '70rem', m: 'auto' }}>
        <Typography sx={{ mb: 2 }} variant="h5" component="h5">
          Contact Us
        </Typography>
        <Typography variant="h6" component="h6">
          We'd like to hear from you
        </Typography>

        <Typography sx={{ mb: 2 }} variant="body1" component="p">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel sunt
          aperiam exercitationem sapiente temporibus eaque minima porro odio.
        </Typography>

        <Stack
          sx={{ mb: 2 }}
          direction={{ md: 'row' }}
          justifyContent="space-between"
          alignItems='center'
          spacing={2}
        >
          <TextField label='Name' size="small" fullWidth  />
          <TextField label='Email' size="small" fullWidth margin='normal'/>
          <Button size="medium" variant="contained"  >
            Submit
          </Button>
        </Stack>
        <Stack direction="row" justifyContent="space-evenly" spacing={2}>
          <Typography variant="body1" component="p">
            info@crishika.com
          </Typography>
          <Typography variant="body1" component="p">
            +91 8349006546
          </Typography>
          <Typography variant="body1" component="p">
            NH 130 Nawagaon
          </Typography>
        </Stack>
      </Box>
    </Container>
  );
};

export default SectionFive;
