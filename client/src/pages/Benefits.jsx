import { Box, Container, Divider, Stack, Typography } from '@mui/material';

const SectionThree = () => {
  return (
    <Container sx={{ my: 8 }}>
      <Divider sx={{ px: 4, mb: 4 }} component="div" role="presentation">
        <Typography variant="h4">Benefits</Typography>
      </Divider>
      <Stack
        direction={{ md: 'row' }}
        justifyContent="space-between"
        alignItems="center"
      >
        <Box sx={{ flex: 1 }}>
          <Box
            sx={{ width: '34rem' }}
            component="img"
            src={require('../assets/images/user-interface.png')}
            alt="some design"
          />
        </Box>
        <Stack sx={{ flex: 1 }}>
          <Box sx={{ mb: 2 }}>
            <Typography sx={{ fontWeight: 'bold', fontSize: '2rem' }}>
              Instant Insights
            </Typography>
            <Typography sx={{ fontSize: '2rem' }}>
              Receive real-time test reports and performance analysis,
              empowering you with valuable feedback and actionable insights to
              enhance your exam readiness.
            </Typography>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography sx={{ fontWeight: 'bold', fontSize: '2rem' }}>
              Study On-the-Go
            </Typography>
            <Typography sx={{ fontSize: '2rem' }}>
              Access our app anytime, anywhere, on your preferred device,
              allowing you to seamlessly fit exam preparation into your busy
              schedule and make the most of every moment.
            </Typography>
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 'bold', fontSize: '2rem' }}>
              Competitive Edge
            </Typography>
            <Typography sx={{ fontSize: '2rem' }}>
              Stay ahead of the competition by accessing unique questions and
              gaining a comprehensive understanding of the exam format, ensuring
              you're fully prepared to excel on test day.
            </Typography>
          </Box>
        </Stack>
      </Stack>
    </Container>
  );
};

export default SectionThree;
