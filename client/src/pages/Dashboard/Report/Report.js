import { Box, Button, Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import DashboardBg from '../../../components/DashboardBg';
import ReportItem from './ReportItem';

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { Link } from 'react-router-dom';

const Report = () => {
  const { questions, options } = useSelector(state => state.questions);
  const { answers } = useSelector(state => state.result);

  const allCorrectAns = questions.map(el => el.correct_answer);
  const marks = allCorrectAns.filter((ans, i) => ans === answers[i]).length;

  return (
    <DashboardBg>
      <Stack sx={{ minheight: '100vh', p: { md: 4 } }} alignItems="center">
        <Box
          sx={{
            flex: 1,
            width: '100%',
            maxWidth: '100rem',
            borderRadius: 5,
            background: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(2.2rem)',
            px: { md: 8, xs: 2 },
            py: 4,
            overflow: 'hidden',
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h5">Quiz report</Typography>
            <Link to={'/dashboard'}>
              <HomeOutlinedIcon fontSize="medium" color="secondary" />
            </Link>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" component="p">
              Result: {marks}/{questions.length}
            </Typography>
            <Typography variant="body2" component="p">
              Time: 10 minute
            </Typography>
          </Stack>
          {questions.map((ques, i) => (
            <ReportItem
              key={i}
              ques={ques}
              quesIndex={i}
              ops={options}
              ans={answers}
            />
          ))}
          <Stack
            sx={{ mt: 2 }}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Link to={'/dashboard'}>
            <Button  disableElevation disableFocusRipple color='secondary' startIcon={<HomeOutlinedIcon />} >
              Home
            </Button>
            </Link>
          </Stack>
        </Box>
      </Stack>
    </DashboardBg>
  );
};

export default Report;
