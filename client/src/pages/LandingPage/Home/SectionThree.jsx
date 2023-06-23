import { Box, Container, Stack, Typography } from '@mui/material';

const SectionThree = () => {
  return (
    <Container>
      <Box sx={{ py: 6 }}>
        <Typography
          sx={{ textAlign: 'center', mb: 4 }}
          variant="h5"
          component="h5"
        >
          Our Products
        </Typography>
        <Stack direction={{ md: 'row' }} justifyContent="space-between" alignItems='center'>
          <Box sx={{ flex: 1 }}>
            <Box
              sx={{ width: '24rem' }}
              component="img"
              src={require('../../../assets/images/logo-512.png')}
              alt="some design"
            />
          </Box>
          <Stack sx={{ flex: 1 }}>
            <Box>
              <Typography>LYK App</Typography>
              <Typography>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem
                ipsum dolor, sit amet consectetur adipisicing elit.
              </Typography>
            </Box>
            <Box>
              <Typography>LYK App</Typography>
              <Typography>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem
                ipsum dolor, sit amet consectetur adipisicing elit.
              </Typography>
            </Box>
            <Box>
              <Typography>LYK App</Typography>
              <Typography>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem
                ipsum dolor, sit amet consectetur adipisicing elit.
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
};

export default SectionThree;
