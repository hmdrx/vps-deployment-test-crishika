import { Box, Radio, Stack, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';

import { useDispatch, useSelector } from 'react-redux';

import { decode } from 'html-entities';
import { pushAnswer, updateAnswer } from '../../../redux/result-reducer';
import { colors } from '../../../constants/colors';
import checkSound from '../../../assets/sound/check.wav';

const Ques = () => {
  const { questions, trace, options } = useSelector(state => state.questions);
  const { answers } = useSelector(state => state.result);

  const checkAudio = new Audio(checkSound);

  const dispatch = useDispatch();

  const optionCheckHandler = val => {
    if (answers[trace]) {
      checkAudio.play();
      return dispatch(updateAnswer({ ans: val, trace: trace }));
    }
    dispatch(pushAnswer(val));
    checkAudio.play();
  };

  return (
    <Box>
      <Box>
        <Typography sx={{ mt: 4, mb: 2 }}>
          {decode(questions[trace]?.question)}
        </Typography>
      </Box>
      <Grid2 container spacing={2}>
        {options.length > 0 &&
          options[trace]?.map((el, i) => (
            <Grid2 key={i} item xs={12} md={6}>
              <Stack
                onClick={optionCheckHandler.bind(this, el)}
                sx={{
                  border: 1,
                  borderColor: colors.disabled,
                  borderRadius: 1,
                  p: 1,
                  cursor: 'pointer',
                }}
                direction="row"
                alignItems="center"
              >
                <Radio
                  sx={{ py: 0 }}
                  value={el}
                  checked={el === answers[trace]}
                />
                <Typography variant="body2" component="span">
                  {decode(el)}
                </Typography>
              </Stack>
            </Grid2>
          ))}
      </Grid2>
    </Box>
  );
};

export default Ques;
