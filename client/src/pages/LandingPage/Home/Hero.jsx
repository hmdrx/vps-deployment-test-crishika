import hero from '../../../assets/svg/hero.svg';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <>
      <Box sx={{ bgcolor: '#25bf7770', pt: 1 }}>
        <Container>
          <Stack
            sx={{ pt: 5 }}
            direction={{ md: 'row' }}
            justifyContent="space-between"
            alignItems="center"
          >
            <Box sx={{ alignSelf: 'flex-end' }}>
              <Typography variant="h2" component="h1">
                Welcome to crishika
              </Typography>
              <Typography variant="body1" component="p">
                Lorem ipsum dolor sit amet consectetur.
              </Typography>
              <Link to='/register'>
              <Button variant="contained" color="secondary" sx={{ mt: 14 }}>
                Get Started!
              </Button>
              </Link>
            </Box>
            <Box
              sx={{ maxWidth: { xs: '30rem', md: '50rem' } }}
              component="img"
              src={hero}
              alt="hero image"
            />
          </Stack>
        </Container>
      </Box>
      <Box>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#25bf7770"
            fillOpacity="1"
            d="M0,192L30,197.3C60,203,120,213,180,234.7C240,256,300,288,360,277.3C420,267,480,213,540,213.3C600,213,660,267,720,245.3C780,224,840,128,900,112C960,96,1020,160,1080,170.7C1140,181,1200,139,1260,122.7C1320,107,1380,117,1410,122.7L1440,128L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z"
          ></path>
        </svg>
      </Box>
    </>
  );
};

export default Hero;
