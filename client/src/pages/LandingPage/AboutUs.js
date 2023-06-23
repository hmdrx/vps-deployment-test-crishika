import { Box, Container, Stack, Typography } from '@mui/material';
import SectionFive from './Home/SectionFive';

import aboutUsImage from '../../assets/images/logo-512.png';

const AboutUs = () => {
  return (
    <Container>
      <Box sx={{ pt: 5,maxWidth: '70rem', m: 'auto' }}>
        <Stack sx={{ py: 2 }} direction={{md: 'row'}} justifyContent="space-between">
          <Typography variant="h5">
            The ONLY TECH COMPANY YOU WANT FOR YOUR PROJECT
          </Typography>
          <Typography variant="body1">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo.
          </Typography>
        </Stack>
        <Box sx={{ py: 2 }}>
          <Typography variant="h5">Design Faster</Typography>
          <Stack
            direction={{md: 'row'}}
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="body1">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat incididunt ut laboret.
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat incididunt ut laboret.
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat incididunt ut laboret.
            </Typography>
            <Box
              sx={{ maxWidth: '24rem', height: 'auto' }}
              src={aboutUsImage}
              alt="about us pic"
              component="img"
            />
          </Stack>
        </Box>
      </Box>
      <SectionFive />
    </Container>
  );
};

export default AboutUs;
