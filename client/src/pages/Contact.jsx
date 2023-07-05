import {
  Alert,
  Box,
  Button,
  Container,
  Divider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import {
  ValidateEmail,
  ValidateMessage,
  ValidateName,
} from '../utils/Validators';

const Contact = () => {
  const [inputs, setInputs] = useState();
  const [error, setError] = useState({
    name: false,
    email: false,
    message: false,
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    vertical: 'bottom',
    horizontal: 'center',
    severity: 'success',
    message: '',
  });

  const handleClick = newState => {
    setSnackbar({ ...newState, open: true });
  };

  const handleClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const submitHandler = () => {
    const isNameValid = ValidateName(inputs?.name);
    const isEmailValid = ValidateEmail(inputs?.email);
    const isMessageValid = ValidateMessage(inputs?.message);

    if (isNameValid && isEmailValid && isMessageValid) {
      (async () => {
        try {
          const res = await axios.post(
            'http://localhost:6767/api/v1/inquiry/guest',
            {
              name: inputs.name.trim(),
              email: inputs.email.trim(),
              message: inputs.message.trim(),
            }
          );
          if (res.status === 201) {
            handleClick({
              vertical: 'bottom',
              horizontal: 'center',
              severity: 'success',
              message: res.data.message,
            });
          }
        } catch (error) {
          handleClick({
            vertical: 'bottom',
            horizontal: 'center',
            severity: 'error',
            message: error.response.data,
          });
        }
      })();
    } else {
      setError({
        name: !isNameValid,
        email: !isEmailValid,
        message: !isMessageValid,
      });
    }
  };
  return (
    <Container sx={{ my: 8 }}>
      <Divider sx={{ px: 4, mb: 4 }} component="div" role="presentation">
        <Typography variant="h4">Contact Us</Typography>
      </Divider>
      <Box sx={{ textAlign: 'center', maxWidth: '70rem', m: 'auto' }}>
        <Snackbar
          autoHideDuration={2000}
          anchorOrigin={{
            vertical: snackbar.vertical,
            horizontal: snackbar.horizontal,
          }}
          open={snackbar.open}
          onClose={handleClose}
          key={snackbar.vertical + snackbar.horizontal}
        >
          <Alert
            onClose={handleClose}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
        <Typography variant="h6" component="h6">
          We'd like to hear from you
        </Typography>

        <Typography sx={{ mb: 2 }} variant="body1" component="p">
          Reach out to us with any questions, feedback, or inquiries. Our
          friendly team is here to assist you and ensure you have the best
          experience with our app.
        </Typography>

        <Stack
          sx={{ mb: 2 }}
          // direction={{ md: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Stack direction={{ md: 'row' }} gap={2} sx={{ width: '100%' }}>
            <TextField
              label="Name *"
              size="medium"
              error={error.name}
              focused={error.name}
              helperText={error.name && 'Plz enter valid name'}
              fullWidth
              onChange={event => {
                setInputs(prev => {
                  return { ...prev, name: event.target.value };
                });
                setError(prev => {
                  return { ...prev, name: false };
                });
              }}
            />

            <TextField
              label="Email *"
              size="medium"
              error={error.email}
              focused={error.email}
              helperText={error.email && 'Plz enter valid email'}
              fullWidth
              onChange={event => {
                setInputs(prev => {
                  return { ...prev, email: event.target.value };
                });
                setError(prev => {
                  return { ...prev, email: false };
                });
              }}
            />
          </Stack>
          {/* <Box display={{ md: 'flex' }}> */}
          <TextField
            id="outlined-multiline-static"
            label="Message *"
            multiline
            rows={4}
            error={error.message}
            focused={error.message}
            helperText={
              error.message && 'Plz enter message between 10-1000 character'
            }
            fullWidth
            onChange={event => {
              setInputs(prev => {
                return { ...prev, message: event.target.value };
              });
              setError(prev => {
                return { ...prev, message: false };
              });
            }}
          />
          {/* </Box> */}

          <Button
            sx={{ alignSelf: 'flex-start' }}
            size="medium"
            variant="contained"
            onClick={submitHandler}
          >
            Submit
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};
export default Contact;
