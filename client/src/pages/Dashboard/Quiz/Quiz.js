import { Box, Button, Stack, Typography } from '@mui/material';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DashboardBg from '../../../components/DashboardBg';

import { nextQues, prevQues } from '../../../redux/question-reducer';
import { pushAnswer } from '../../../redux/result-reducer';
import { decreaseTimer, resetTimer } from '../../../redux/timer-reducer';
import Ques from './Ques';
import nextSound from '../../../assets/sound/next.wav';
import timeoutSound from '../../../assets/sound/timeout.mp3';

const Quiz = () => {
  const { questions, trace } = useSelector(state => state.questions);
  const { answers } = useSelector(state => state.result);
  const { hour, minute, second } = useSelector(state => state.timer);

  const nextAudio = new Audio(nextSound);
  const endAudio = useMemo(() => new Audio(timeoutSound), [])

  
  
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (hour + minute + second <= 4 && second >= 1) {
      endAudio.play();
    }
    if (hour + minute + second === 0) {
      questions.map((el, i) => {
        if (!answers[i]) dispatch(pushAnswer('undefined'));
        return null;
      });
      navigate('/report', { replace: true });
    }
  }, [answers, dispatch, hour, minute, second, navigate, questions, endAudio]);

  const nextQuesHandler = () => {
    if (!answers[trace]) {
      dispatch(pushAnswer('undefined'));
    }
    if (questions.length <= trace + 1) {
      dispatch(resetTimer())
      navigate('/report', { replace: true });
      return;
    }
    dispatch(nextQues());
    nextAudio.play();
  };

  const prevHandler = () => {
    dispatch(prevQues());
    nextAudio.play();
  };

  useEffect(() => {
    const quizTimer = setInterval(() => {
      dispatch(decreaseTimer());
    }, 1000);

    return () => clearInterval(quizTimer);
  }, [dispatch]);

  return (
    <DashboardBg>
      <Stack
        sx={{
          minHeight: { xs: window.innerHeight, md: '100vh' },
          py: { md: 8 },
        }}
        alignItems="center"
      >
        <Stack
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
          justifyContent="space-between"
        >
          <Box>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{
                position: 'sticky',
                top: 0,
                p: 1,
                background: 'rgba(255, 255, 255, 0.2)',
              }}
            >
              <Typography variant="body2" component="p">
                Question:
                {questions.length > 0 && (
                  <Typography variant="body2" component="span">
                    {trace + 1}/{questions.length}
                  </Typography>
                )}
              </Typography>
              <Typography variant="body2" component="p">
                Time: {('0' + hour).slice(-2)}: {('0' + minute).slice(-2)}:
                {('0' + second).slice(-2)}
              </Typography>
            </Stack>
            <Ques />
          </Box>

          <Stack sx={{ mt: 4 }} direction="row" justifyContent="space-between">
            {trace > 0 && (
              <Button
                disableElevation
                disableRipple
                variant="contained"
                size="small"
                onClick={prevHandler}
              >
                Previous
              </Button>
            )}

            <Button
              sx={{ marginLeft: 'auto' }}
              disableElevation
              disableRipple
              variant="contained"
              size="small"
              onClick={nextQuesHandler}
            >
              {questions.length > trace + 1 ? 'Next' : 'Submit'}
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </DashboardBg>
  );
};

export default Quiz;
