import React, { useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import DetailHolder from './DetailHolder';
import Update from './Update';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../redux/auth-reducer';
import useHttp from '../../../hooks/use-http';
import { getMyProfile } from '../../../services/accountApi';
import { personalInfo } from '../../../redux/personal-data-reducer';
import SkeletonUI from './Skeleton';

const AccountDetails = () => {
  const userData = useSelector(state => state.personalData);
  const auth = useSelector(state => state.auth.token);
  const [open, setOpen] = React.useState(false);
  const { data, loading, request } = useHttp(getMyProfile);

  const dispatch = useDispatch();

  const allowedPersonalDataField = ['name', 'email', 'mobile'];
  const allowedAcademicDataField = ['degree', 'status', 'college'];

  const personalData = allowedPersonalDataField.reduce((obj, key) => {
    obj[key] = userData[key];
    return obj;
  }, {});
  const academicData = allowedAcademicDataField.reduce((obj, key) => {
    obj[key] = userData[key];
    return obj;
  }, {});

 

  useEffect(() => {
    request(auth);
    // eslint-disable-next-line
  }, [auth]);

  useEffect(() => {
    dispatch(personalInfo(data?.user));
  }, [data, dispatch]);

  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <>
      <Update heading="update/change password" open={open} setOpen={setOpen} />
      <Grid container>
        {!loading ? (
          <>
            <Grid item xs={12} sm={6}>
              <DetailHolder
                sectionTitle="personal details"
                verifiedUser={userData.verified}
                data={personalData}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DetailHolder
                sectionTitle="academic details"
                data={academicData}
              />
            </Grid>
          </>
        ) : (
          <SkeletonUI />
        )}
        <Grid item xs={12} sm={6}>
          <Box sx={{ mx: 1, mt: 2, p: 1 }}>
            <Typography
              onClick={() => setOpen(true)}
              sx={{ display: 'inline-block', cursor: 'pointer' }}
            >
              Update/Change password
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ mx: 1, mt: 2, p: 1 }}>
            <Typography
              onClick={logoutHandler}
              sx={{ display: 'inline-block', cursor: 'pointer' }}
            >
              Logout
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default AccountDetails;
