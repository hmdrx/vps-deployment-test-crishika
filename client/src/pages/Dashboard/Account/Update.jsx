import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Stack, TextField } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { personalInfo } from '../../../redux/personal-data-reducer';
import useHttp from '../../../hooks/use-http';
import { updateProfile } from '../../../services/accountApi';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '100%', sm: 480 },
  bgcolor: '#ffffff43',
  backdropFilter: 'blur(2rem)',
  boxShadow: 24,
  borderRadius: 2,
  py: 2,
  px: 4,
};

const Update = ({ heading, open, setOpen, userData }) => {
  const [updatePersonalInfo, setUpdatePersonalInfo] = useState({});
  const { data, loading, request } = useHttp(updateProfile);

  const auth = useSelector(state => state.auth.token);

  const dispatch = useDispatch();

  useEffect(() => {
    setUpdatePersonalInfo(userData);
  }, [userData]);

  let modPersonalData;

  if (updatePersonalInfo) {
    modPersonalData = Object.keys(updatePersonalInfo).map(el => ({
      field: el,
      value: updatePersonalInfo[el],
    }));
  }

  const handleClose = () => {
    setOpen(false);
  };

  const onChangeHandler = (i, event) => {
    const value = event.target.value;
    const field = event.target.name;
    setUpdatePersonalInfo(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    if (data) {
      dispatch(personalInfo(data.user));
    }
  }, [data, dispatch]);

  const onSaveHandler = async () => {
    await request(updatePersonalInfo, auth);

    handleClose();
  };

  return (
    <>
      <Modal
        open={open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              sx={{ textTransform: 'capitalize' }}
              variant="h6"
              component="h2"
            >
              {heading}
            </Typography>

            {modPersonalData &&
              modPersonalData.map((el, i) => (
                <TextField
                  key={el.field}
                  label={el.field}
                  margin="normal"
                  fullWidth
                  sx={{ textTransform: 'capitalize' }}
                  size="small"
                  name={el.field}
                  value={el.value}
                  disabled={el.field === 'email'}
                  onChange={
                    el.field === 'email'
                      ? () => {}
                      : onChangeHandler.bind(this, i)
                  }
                />
              ))}
            <Stack sx={{ mt: 2 }} direction="row" justifyContent="flex-end">
              <Button
                sx={{ mr: 3 }}
                onClick={handleClose}
                variant="outlined"
                color="btnWhiteOutlined"
              >
                Cancel
              </Button>
              <Button
                onClick={onSaveHandler}
                disableElevation
                variant="contained"
              >
                {loading ? 'Updating...' : 'Save'}
              </Button>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default Update;
