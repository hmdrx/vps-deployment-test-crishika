import { Container, Typography, Grid, Box, Card, Divider } from '@mui/material';

const card = [
  {
    title: 'Read',
    desc: "Expand your intellectual prowess with our app's swipe reading feature that puts endlesss one-liner questions at your fingertips.",
  },
  {
    title: 'Practice',
    desc: 'Sharpen your skills and boost your confidence with our comprehensive test practice feature',
  },
  {
    title: 'Repeat',
    desc: 'Uncover the right path to success by revisiting misunderstood concepts',
  },
];

const cards = card.map(el => (
  <Grid item xs={12} md={4} sx={{ p: 2 }} key={el + Math.random()}>
    <Card
      sx={{
        p: 4,
        bgcolor: 'transparent',
        backdropFilter: 'blur(4rem)',
        minHeight: '400px',
      }}
    >
      {(el.title === 'Read' && (
        <Box
          sx={{ width: '18rem' }}
          component="img"
          src={require('../assets/images/read.png')}
          alt="some design"
        />
      )) ||
        (el.title === 'Practice' && (
          <Box
            sx={{ width: '18rem' }}
            component="img"
            src={require('../assets/images/practice.png')}
            alt="some design"
          />
        )) || (
          <Box
            sx={{ width: '18rem' }}
            component="img"
            src={require('../assets/images/repeat.png')}
            alt="some design"
          />
        )}
      <Typography sx={{ mb: 1 }} variant="h6" component="h6">
        {el.title}
      </Typography>
      <Typography>{el.desc}</Typography>
    </Card>
  </Grid>
));

const SectionTwo = () => {
  return (
    <Container sx={{ my: 8 }}>
      <Divider sx={{ px: 4, mb: 4 }} component="div" role="presentation">
        <Typography variant="h4">Features</Typography>
      </Divider>
      <Box sx={{ textAlign: 'center' }}>
        <Grid container columnSpacing={2}>
          {cards}
        </Grid>
      </Box>
    </Container>
  );
};

export default SectionTwo;
