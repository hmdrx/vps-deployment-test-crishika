import { Box, IconButton, Link, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import Auth from './Auth';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/auth-reducer';
import useHttp from '../../hooks/use-http';
import { loginApi } from '../../services/authApi';
import { LoadingButton } from '@mui/lab';

const icon = require('../../assets/images/login.png');
const greetingText = 'Welcome back!';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [inputs, setInputs] = useState({ email: '', password: '' });
  const { data, loading, request } = useHttp(loginApi);

  // const { open } = useSelector(state => state.alert);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClickShowPassword = () => setShowPassword(show => !show);

  const onInputChangeHandler = e => {
    setInputs(prevVal => ({ ...prevVal, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    if (data) {
      dispatch(login(data.token));
      navigate('/dashboard', { replace: true });
    }
  }, [data, dispatch, navigate]);

  const loginHandler = async () => {
    await request(inputs);
  };

  return (
    <Auth
      greetingText={greetingText}
      linkText="You don't have account? "
      link="Register"
      icon={icon}
    >
      <Box component="form" maxWidth={'35rem'}>
        <Typography textAlign="center" variant="h6">
          Login
        </Typography>
        <TextField
          fullWidth
          margin="dense"
          label="Email"
          name="email"
          size="small"
          variant="standard"
          type="email"
          value={inputs.email}
          onChange={onInputChangeHandler}
        />
        <TextField
          fullWidth
          size="small"
          variant="standard"
          margin="dense"
          label="Password"
          name="password"
          value={inputs.password}
          onChange={onInputChangeHandler}
          type={showPassword ? 'text' : 'password'}
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Link href="#" variant="body2" underline="hover" color="info.main">
            Forgot Password?
          </Link>
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </Box>

        <LoadingButton
          sx={{ mt: 6 }}
          fullWidth
          size="small"
          onClick={loginHandler}
          loading={loading}
          variant="contained"
        >
          Login
        </LoadingButton>
      </Box>
    </Auth>
  );
};

export default Login;
