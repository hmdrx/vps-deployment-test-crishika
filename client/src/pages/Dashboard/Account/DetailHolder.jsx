import React from 'react';

import { Box, Stack, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import VerifiedIcon from '@mui/icons-material/Verified';
import Update from './Update';

const DetailHolder = ({ sectionTitle, data, verifiedUser }) => {
  const [open, setOpen] = React.useState(false);

  const personalData = Object.keys(data).map(el => {
    return { field: el, value: data[el] };
  });

  return (
    <>
      <Update
        heading={sectionTitle}
        open={open}
        setOpen={setOpen}
        userData={data}
      />
      <Box
        sx={{
          mx: 1,
          p: 1,
          borderRadius: 2,
          height: '100%',
          bgcolor: '#25bf7720',
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            sx={{ fontWeight: '500', textTransform: 'capitalize' }}
            variant="body1"
          >
            {sectionTitle}
          </Typography>
          <EditIcon
            onClick={() => {
              setOpen(true);
            }}
            fontSize="small"
            sx={{ cursor: 'pointer' }}
          />
        </Stack>
        {personalData.map(el => (
          <Stack
            key={el.field}
            sx={{
              bgcolor: '#25bf7720',
              p: 1,
              my: 1,
              borderRadius: 2,
            }}
            direction="row"
            justifyContent="space-between"
          >
            <Typography
              sx={{ flex: 1, textTransform: 'capitalize' }}
              variant="body2"
            >
              {el.field}
            </Typography>
            <Typography sx={{ flex: 2 }} variant="body2">
              {el.value}
            </Typography>
            {el.field === 'email' && verifiedUser && (
              <VerifiedIcon sx={{ fontSize: 16 }} />
            )}
          </Stack>
        ))}
      </Box>
    </>
  );
};

export default DetailHolder;
