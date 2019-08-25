import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@material-ui/core';

import audioLoading from './../../assets/login.mp3';

const LoadingModal = ({ connecteduser, name }) => {
  const [open, setOpen] = React.useState(false);

  useEffect(
    () => {
      setOpen(connecteduser);

      if (connecteduser) {
        setTimeout(() => {
          setOpen(false);
        }, 4000);
      }
    },
    [connecteduser]
  );

  function handleClose () {
    setOpen(false);
  }

  return (
    <Dialog
      open={open}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>
        {'Conectado na sala!'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          Olá, <strong>{name}</strong> nós já conectamos você na sala, por
          favor, inicie sua reunião ou transmissão.
          <iframe
            src={audioLoading}
            allow='autoplay'
            style={{ display: 'none' }}
          />
        </DialogContentText>
        <DialogActions>
          <Button variant='contained' onClick={handleClose} color='primary'>
            Entendi
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

const mapStateToProps = state => ({
  name: state.session.user.me.name,
  connecteduser: state.connecteduser
});

export default connect(mapStateToProps)(LoadingModal);
