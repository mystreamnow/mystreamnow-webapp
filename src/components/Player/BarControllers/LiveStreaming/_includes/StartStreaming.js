import React from 'react';
import { connect } from 'react-redux';
import { DialogTitle, Dialog, useMediaQuery, Slide } from '@material-ui/core';

import { useTheme } from '@material-ui/core/styles';

import './assets/scss/StartStreaming.scss';

const Transition = React.forwardRef(function Transition (props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

import DialogActionsBroadcasting from './../_includes/DialogActionsBroadcasting/DialogActionsBroadcasting';
import DialogContentBroadcasting from './../_includes/DialogContentBroadcasting/DialogContentBroadcasting';

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
      <DialogContentBroadcasting />
      <DialogActionsBroadcasting handleClose={handleClose} />
    </Dialog>
  );
};

const mapState = state => {
  return {
    layoutbroadcast: state.layoutbroadcast
  };
};

export default connect(mapState)(StartStreaming);
