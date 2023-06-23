import { Box, Container } from '@mui/material';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { colors } from '../../../constants/colors';

ChartJS.register(ArcElement, Tooltip, Legend);

const MyChart = ({ data }) => {
  const finalData = data && data?.map(el => el.toFixed(2));

  const chartData = {
    labels: ['Correct Ans', 'Incorrect Ans', 'Unanswered'],
    datasets: [
      {
        label: 'Percentage',
        data: finalData,
        backgroundColor: [colors.primary, 'rgb(223, 113, 23)', colors.disabled],

        borderWidth: 0.1,
      },
    ],
  };

  return (
    <Box>
      <Container>
        <Box sx={{ width: '100%' }}>
          <Doughnut data={chartData} />
        </Box>
      </Container>
    </Box>
  );
};

export default MyChart;
