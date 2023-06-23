import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Stack, TextField } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {xs: '100%', sm:400},
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 2,
  p: 2,
};

export default function TransitionsModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>

            <TextField
              label="Confirm New Password"
              margin="normal"
              fullWidth
              size="small"
            />
            <TextField
              label="Confirm New Password"
              margin="normal"
              fullWidth
              size="small"
            />
            <TextField
              label="Confirm New Password"
              margin="normal"
              fullWidth
              size="small"
            />
            <Stack direction="row" justifyContent="flex-end">
              <Button sx={{ mr: 3 }} onClick={handleClose} variant="outlined">
                Cancel
              </Button>
              <Button variant="contained">Save</Button>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
