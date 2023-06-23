import {
  Box,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { cards } from '../../../data/data';
import { performanceInfo } from '../../../redux/performance-reducer';
import { resetExam } from '../../../redux/question-reducer';
import MyChart from './Chart';
import OverallReportCard from './OverallReportCard';
import SubReportCard from './SubReportCard';

const Performance = () => {
  const { id, sub, questions } = useSelector(state => state.questions);
  const { answers } = useSelector(state => state.result);
  const performanceData = useSelector(state => state.performanceData);

  const dispatch = useDispatch();

  let totalQuestionsAttempted;
  let overallValues = [];
  let overallPercentage = [];
  (() => {
    totalQuestionsAttempted = performanceData
      ?.map(el => el.to_ques)
      .reduce((a, c) => a + c, 0);

    // in amount
    const totalCorrect = performanceData
      ?.map(el => el.co_ans)
      .reduce((a, c) => a + c, 0);
    const totalWrong = performanceData
      ?.map(el => el.wo_ans)
      .reduce((a, c) => a + c, 0);
    const totalUnanswered = performanceData
      ?.map(el => el.un_ans)
      .reduce((a, c) => a + c, 0);

    // in percentage
    const totalCorrectPercent =
      (100 * totalCorrect) / totalQuestionsAttempted || 0;
    const totalWrongPercent = (100 * totalWrong) / totalQuestionsAttempted || 0;
    const totalUnansweredPercent =
      (100 * totalUnanswered) / totalQuestionsAttempted || 0;

    overallValues = [totalCorrect, totalWrong, totalUnanswered];
    overallPercentage = [
      totalCorrectPercent,
      totalWrongPercent,
      totalUnansweredPercent,
    ];
  })();

  useEffect(() => {
    if (questions.length) {
      const numOfQuestions = questions.length;
      const allCorrectAns = questions.map(el => el.correct_answer);
      const correctAns = allCorrectAns.filter(
        (ans, i) => ans === answers[i]
      ).length;
      const unAns = answers.filter(ans => ans === 'undefined').length;
      const wrongAns = numOfQuestions - correctAns - unAns;
      dispatch(
        performanceInfo({
          id: id,
          sub: sub,
          to_ques: numOfQuestions,
          co_ans: correctAns,
          wo_ans: wrongAns,
          un_ans: unAns,
        })
      );
      dispatch(resetExam())
    }
  }, [answers, dispatch, questions, sub, id]);

  return (
    <Container sx={{ p: 0 }}>
      <Typography sx={{ textAlign: 'center' }} variant="body1">
        Overall Performance
      </Typography>
      {performanceData.length > 0 && (
        <Stack
          sx={{ py: 2 }}
          direction={{ xs: 'column-reverse', md: 'row' }}
          justifyContent="space-around"
          alignItems="center"
        >
          <Box sx={{ flex: 1 }}>
            <Box sx={{ textAlign: 'center', my: 2 }}>
              <Typography variant="h5">{totalQuestionsAttempted}</Typography>
              <Typography variant="body2">Questions Attempted</Typography>
            </Box>
            <Stack
              sx={{ flexWrap: 'wrap' }}
              direction="row"
              justifyContent="space-evenly"
              alignItems="center"
            >
              {['Correct Answered', 'Wrong Answered', 'Unanswered'].map(
                (el, i) => (
                  <OverallReportCard
                    key={el}
                    field={el}
                    value={overallValues[i]}
                  />
                )
              )}
            </Stack>
          </Box>
          <Stack sx={{ flex: 1 }} direction="row" justifyContent="center">
            {<MyChart data={overallPercentage} />}
          </Stack>
        </Stack>
      )}
      {!performanceData.length && (
        <Typography
          sx={{ textAlign: 'center', my: 8, color: 'gray' }}
          variant="body2"
        >
          No overall Record found !!
        </Typography>
      )}
      <Divider sx={{ my: 2 }} />
      <Typography sx={{ textAlign: 'center' }} variant="body1">
        Subject Wise Report
      </Typography>

      {performanceData.length > 0 && (
        <Grid sx={{ py: 2 }} container columnSpacing={1}>
          {performanceData?.map(el => (
            <Grid key={el.sub} item xs={6} md={3}>
              <SubReportCard el={el} />
            </Grid>
          ))}
        </Grid>
      )}
      {!performanceData.length && (
        <Typography
          sx={{ textAlign: 'center', my: 8, color: 'gray' }}
          variant="body2"
        >
          No Record !!
        </Typography>
      )}
    </Container>
  );
};

export default Performance;
