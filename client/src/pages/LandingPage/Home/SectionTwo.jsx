import { Container, Typography, Grid, Box, Card } from '@mui/material';
import InsertChartIcon from '@mui/icons-material/InsertChart';

const card = [0, 1, 2];

const cards = card.map(el => (
  <Grid item xs={12} md={4} sx={{ p: 2 }} key={el} >
    <Card sx={{ py: 4, bgcolor: 'transparent', backdropFilter: 'blur(4rem)' }}>
      <InsertChartIcon sx={{ fontSize: '18rem' }} />
      <Typography sx={{ mb: 1 }} variant="h6" component="h6">
        Graphic designing
      </Typography>
      <Typography>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus,
        debitis? Voluptas tempora nisi rerum cupiditate!
      </Typography>
    </Card>
  </Grid>
));

const SectionTwo = () => {
  return (
    <Container>
      <Box sx={{ py: 6, textAlign: 'center' }}>
        <Typography sx={{ mb: 2 }} variant="h5" component="h5">
          Our Services
        </Typography>
        <Grid container columnSpacing={2}>
          {cards}
        </Grid>
      </Box>
    </Container>
  );
};

export default SectionTwo;
