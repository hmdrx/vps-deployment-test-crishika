import { Box, Container, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { colors } from '../constants/colors';
const SectionOne = () => {
  return (
    <Container sx={{ my: 8 }}>
      <Stack
        direction={{ md: 'row' }}
        justifyContent="space-between"
        alignItems="center"
      >
        <Box sx={{ flex: 2 }}>
          <Typography variant="h4">Free Forever</Typography>
          <Typography
            sx={{ my: 2, fontSize: '2.2rem' }}
            color={colors.dark}
            variant="body1"
          >
            No charges, no limits. Our app is your forever companion in your
            educational endeavors.
          </Typography>
        </Box>

        <Box
          sx={{
            flex: 2,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{ width: '22rem', marginX: 'auto' }}
            component="img"
            src={require('../assets/images/no-money.png')}
            alt="some design"
          />
        </Box>
      </Stack>
    </Container>
  );
};

export default SectionOne;
