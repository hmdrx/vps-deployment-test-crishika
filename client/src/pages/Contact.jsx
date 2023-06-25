import {
  Box,
  Button,
  Container,
  Divider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';

const SectionFive = () => {
  return (
    <Container sx={{ my: 8 }}>
      <Divider sx={{ px: 4, mb: 4 }} component="div" role="presentation">
        <Typography variant="h4">Contact Us</Typography>
      </Divider>
      <Box sx={{ textAlign: 'center', maxWidth: '70rem', m: 'auto' }}>
        <Typography variant="h6" component="h6">
          We'd like to hear from you
        </Typography>

        <Typography sx={{ mb: 2 }} variant="body1" component="p">
          Reach out to us with any questions, feedback, or inquiries. Our
          friendly team is here to assist you and ensure you have the best
          experience with our app.
        </Typography>

        <Stack
          sx={{ mb: 2 }}
          // direction={{ md: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Stack direction={{ md: 'row' }} gap={2} sx={{ width: '100%' }}>
            <TextField label="Name" size="medium" fullWidth />
            <TextField label="Email" size="medium" fullWidth />
          </Stack>
          {/* <Box display={{ md: 'flex' }}> */}
          <TextField
            id="outlined-multiline-static"
            label="Message"
            multiline
            rows={4}
            fullWidth
          />
          {/* </Box> */}

          <Button
            sx={{ alignSelf: 'flex-start' }}
            size="medium"
            variant="contained"
          >
            Submit
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default SectionFive;
