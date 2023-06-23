import { Paper, Stack, Typography } from '@mui/material';

const OverallReportCard = ({ field, value }) => {
  return (
    <Paper
      sx={{
        textAlign: 'center',
        p: 1,
        m: 1,
        bgcolor: () => {
          if (field === 'Correct Answered') {
            return '#25bf7754';
          } else if (field === 'Wrong Answered') {
            return '#ff000054';
          } else {
            return '#66696554';
          }
        },
        width: '10rem',
        height: '10rem',
      }}
    >
      <Stack>
        <Typography variant="h6">{value}</Typography>
        <Typography variant="body2">{field}</Typography>
      </Stack>
    </Paper>
  );
};

export default OverallReportCard;
