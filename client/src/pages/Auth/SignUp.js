import { useEffect, useState } from 'react';
import { Box, IconButton, Link, TextField, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';

import Auth from './Auth';
import { useNavigate } from 'react-router-dom';
import { showAlert } from '../../redux/alert-reducer';
import { useDispatch } from 'react-redux';
import useHttp from '../../hooks/use-http';
import { registerApi } from '../../services/authApi';
const icon = require('../../assets/images/register.png');
const greetingText = 'Create Your Account Its Free!';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { data, loading, request } = useHttp(registerApi);

  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClickShowPassword = () => setShowPassword(show => !show);

  const inputChangeHandler = e => {
    const value = e.target.value;
    const field = e.target.name;
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    if (data?.status === 'success') {
      dispatch(showAlert('Signed Up Successfully. Plz login now'));
      navigate('/login');
    }
  }, [data, navigate, dispatch]);

  const onRegisterHandler = () => {
    request(inputs);
  };

  // const handleMouseDownPassword = event => {
  //   event.preventDefault();
  // };
  return (
    <Auth
      greetingText={greetingText}
      linkText="Already have account? "
      link="Login"
      icon={icon}
    >
      <Box component="form" maxWidth={'35rem'}>
        <Typography textAlign="center" variant="h6">
          Sign Up
        </Typography>
        <TextField
          fullWidth
          margin="dense"
          label="Name"
          name="name"
          variant="standard"
          type="text"
          value={inputs?.name}
          onChange={inputChangeHandler}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Email"
          name="email"
          variant="standard"
          type="email"
          value={inputs?.email}
          onChange={inputChangeHandler}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Create Password"
          variant="standard"
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={inputs?.password}
          onChange={inputChangeHandler}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Confirm Password"
          variant="standard"
          name="confirmPassword"
          type={showPassword ? 'text' : 'password'}
          value={inputs?.confirmPassword}
          onChange={inputChangeHandler}
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="caption" component="span">
            By signing up you are accepting our{' '}
            <Link
              href="#"
              variant="caption"
              underline="hover"
              color="info.main"
            >
              terms&conditions
            </Link>
          </Typography>

          <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            // onMouseDown={handleMouseDownPassword}
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </Box>

        <LoadingButton
          size="small"
          onClick={onRegisterHandler}
          // endIcon={<SendIcon />}
          loading={loading}
          variant="contained"
        >
          Sign Up
        </LoadingButton>
      </Box>
    </Auth>
  );
};

export default SignUp;
