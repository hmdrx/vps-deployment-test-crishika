import { Box, Grid, Paper, Radio, Stack, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DangerousIcon from '@mui/icons-material/Dangerous';
import CircleIcon from '@mui/icons-material/Circle';
import React from 'react';
import { colors } from '../../../constants/colors';
import { decode } from 'html-entities';

const ReportItem = ({ ques, quesIndex, ops, ans }) => {
  return (
    <Paper sx={{ bgcolor: '#ffffff33', mt: 2, p: 2 }} elevation={0}>
      <Stack direction="row">
        <Stack direction="row">
          {ques.correct_answer === ans[quesIndex] && (
            <CheckCircleIcon color="primary" />
          )}
          {ques.correct_answer !== ans[quesIndex] &&
            ans[quesIndex] !== 'undefined' && <DangerousIcon color="error" />}
          {'undefined' === ans[quesIndex] && <CircleIcon color="disabled" />}
          <Typography
            variant="body1"
            color={'undefined' === ans[quesIndex] && colors.disabled}
          >
            {decode('&nbsp')}Q.{quesIndex + 1}
            {decode('&nbsp')}
          </Typography>
        </Stack>

        <Typography
          variant="body1"
          component="span"
          color={'undefined' === ans[quesIndex] && colors.disabled}
        >
          {decode(ques.question)}
        </Typography>
      </Stack>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        {ops[quesIndex].map((el, i) => (
          <Grid item xs={6} key={i}>
            <Box sx={{ position: 'relative' }}>
              {el === ques.correct_answer && ans[quesIndex] !== el && (
                <Typography
                  variant="caption"
                  color="white"
                  component="span"
                  sx={{
                    textAlign: 'center',
                    px: 1,
                    borderRadius: 3,
                    position: 'absolute',
                    left: 6,
                    top: -12,
                    bgcolor:
                      'undefined' === ans[quesIndex]
                        ? colors.disabled
                        : colors.primary,
                  }}
                >
                  Answer
                </Typography>
              )}
              <Stack
                sx={{
                  border: 1,
                  borderColor: colors.disabled,
                  borderRadius: 1,
                  p: 1,
                }}
                direction="row"
                alignItems="center"
              >
                <Radio
                  sx={{ cursor: 'default', py: 0 }}
                  disableRipple
                  disabled={'undefined' === ans[quesIndex]}
                  checked={ans[quesIndex] === el}
                  color={el === ques.correct_answer ? 'primary' : 'error'}
                />
                <Typography
                  variant="body2"
                  component="span"
                  color={'undefined' === ans[quesIndex] && colors.disabled}
                >
                  {decode(el)}
                </Typography>
              </Stack>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default ReportItem;
