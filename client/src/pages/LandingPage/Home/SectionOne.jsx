import { Box, Button, Container, Typography } from '@mui/material';
import { Stack } from '@mui/system';
const SectionOne = () => {
  return (
    <Container>
      <Stack
        direction={{ md: 'row' }}
        justifyContent="space-between"
        alignItems="center"
        sx={{ py: 6 }}
      >
        <Box>
          <Typography variant="h6" component="h6">
            Our most powerful engine to date
          </Typography>
          <Typography sx={{ mb: 2 }} variant="body1" component="p">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque,
            odit?
          </Typography>
          <Button size="small" variant="outlined">
            Our portfolio
          </Button>
        </Box>
        <Box
          sx={{ width: '24rem' }}
          component="img"
          src={require('../../../assets/images/logo-512.png')}
          alt="some design"
        />
      </Stack>
    </Container>
  );
};

export default SectionOne;
