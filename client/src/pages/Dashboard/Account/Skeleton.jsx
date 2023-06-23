import { Box, Grid, Skeleton } from '@mui/material';
import React from 'react';

const SkeletonUI = () => {
  return (
    <>
      <Grid item xs={12} sm={6}>
        <Box
          sx={{
            mx: 1,
            p: 1,
            borderRadius: 2,
            height: '100%',
            bgcolor: '#25bf7720',
          }}
        >
          <Skeleton
            sx={{ my: 1 }}
            variant="rounded"
            height={40}
            animation={false}
          />
          <Skeleton
            sx={{ my: 1 }}
            variant="rounded"
            height={30}
            animation="wave"
          />
          <Skeleton
            sx={{ my: 1 }}
            variant="rounded"
            height={30}
            animation="wave"
          />
          <Skeleton
            sx={{ my: 1 }}
            variant="rounded"
            height={30}
            animation="wave"
          />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box
          sx={{
            mx: 1,
            p: 1,
            borderRadius: 2,
            height: '100%',
            bgcolor: '#25bf7720',
          }}
        >
          <Skeleton
            sx={{ my: 1 }}
            variant="rounded"
            height={40}
            animation={false}
          />
          <Skeleton
            sx={{ my: 1 }}
            variant="rounded"
            height={30}
            animation="wave"
          />
          <Skeleton
            sx={{ my: 1 }}
            variant="rounded"
            height={30}
            animation="wave"
          />
          <Skeleton
            sx={{ my: 1 }}
            variant="rounded"
            height={30}
            animation="wave"
          />
        </Box>
      </Grid>
    </>
  );
};

export default SkeletonUI;
