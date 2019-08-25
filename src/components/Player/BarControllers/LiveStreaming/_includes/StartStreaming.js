import React from 'react';
import {
  DialogTitle,
  DialogContentText,
  DialogContent,
  Button,
  Dialog,
  DialogActions,
  useMediaQuery,
  Slide,
  Fab
} from '@material-ui/core';

import './assets/scss/StartStreaming.scss';

import { useTheme } from '@material-ui/core/styles';

import PlayArrow from '@material-ui/icons/PlayArrow';

const Transition = React.forwardRef(function Transition (props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

import ContainerLayout from './ContainerLayout/ContainerLayout';
import LocaleTransmission from './LocaleTransmission/LocaleTransmission';

const StartStreaming = ({ open, setOpen }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  function handleClose () {
    setOpen(false);
  }

  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth
      maxWidth='lg'
      TransitionComponent={Transition}
      keepMounted
      open={open}
      onClose={handleClose}
      aria-labelledby='form-dialog-title'
    >
      <DialogTitle id='form-dialog-title'>Layout da transmissão</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Escolha o layout que você deseja iniciar sua transmissão:
        </DialogContentText>
        <ContainerLayout />
        <LocaleTransmission />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='secondary'>
          Cancelar
        </Button>
        <Fab
          aria-label='send'
          variant='extended'
          onClick={handleClose}
          color='primary'
        >
          <PlayArrow className='send' />
          Iniciar transmissão
        </Fab>
      </DialogActions>
    </Dialog>
  );
};

export default StartStreaming;
