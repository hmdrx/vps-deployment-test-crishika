import { Box, Typography } from '@mui/material';
import { colors } from '../../../constants/colors';

const SubReportCard = ({ el }) => {
  const mySx = {
    display: 'flex',
    p: 1,
    my: '.2rem',
    border: 1,
    borderColor: colors.disabled,
    borderRadius: 3,
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
        m: 1,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          p: 1,
          width: '18rem',
          minHeight: '24rem',
          borderBottom: 1,
          borderTop: 1,
          borderColor: colors.disabled,
          borderRadius: 4,
        }}
      >
        <Typography
          sx={{ textAlign: 'center', pb: '.5rem' }}
          variant="subtitle2"
        >
          {el.sub}
        </Typography>
        <Box sx={mySx}>
          <Typography sx={{ flex: 3 }} variant="body2">
            Questions
          </Typography>
          <Typography sx={{ flex: 1, ml: 2 }} variant="body2">
            {el.to_ques}
          </Typography>
        </Box>
        <Box sx={mySx}>
          <Typography sx={{ flex: 3 }} variant="body2">
            Correct
          </Typography>
          <Typography sx={{ flex: 1, ml: 2 }} variant="body2">
            {el.co_ans}
          </Typography>
        </Box>
        <Box sx={mySx}>
          <Typography sx={{ flex: 3 }} variant="body2">
            Wrong
          </Typography>
          <Typography sx={{ flex: 1, ml: 2 }} variant="body2">
            {el.wo_ans}
          </Typography>
        </Box>
        <Box sx={mySx}>
          <Typography sx={{ flex: 3 }} variant="body2">
            Unanswered
          </Typography>
          <Typography sx={{ flex: 1, ml: 2 }} variant="body2">
            {el.un_ans}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SubReportCard;
