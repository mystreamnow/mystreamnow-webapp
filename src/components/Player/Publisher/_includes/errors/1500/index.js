import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  useTheme
} from '@material-ui/core';

const ErrorType1500 = () => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    setOpen(true);
  }, []);

  function handleClose () {
    setOpen(false);
  }

  return (
    <Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby='responsive-dialog-title'
      >
        <DialogTitle id='responsive-dialog-title'>
          {'Infelizmente não conseguimos detectar sua câmera ou microfone'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Olá nós não conseguimos detectar sua câmera ou microfone. Para
            tentar solucionar o problema tente verificar sua permissão de câmera
            e microfoneveja a seguir como realizar o procedimento:
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Disagree
          </Button>
          <Button onClick={handleClose} color='primary'>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  name: state.session.user.me.name
});

export default connect(mapStateToProps)(ErrorType1500);
