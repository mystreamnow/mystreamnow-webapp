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

import { detectBrowser } from './../../../../../helper/helper';

const NotSupported = () => {
  const [open, setOpen] = React.useState(false);
  const [browser, setBrowser] = React.useState();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    setBrowser(detectBrowser());
    setOpen(true);
  }, []);

  function handleClose () {
    setOpen(false);
  }

  return (
    <Fragment>
      <Dialog
        maxWidth={'md'}
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby='responsive-dialog-title'
      >
        <DialogTitle id='responsive-dialog-title'>
          Infelizmente o seu navegador ({browser}) não tem suporte para
          compartilhar tela.
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <p>Pedimos a gentileza de utilizar um dos navegadores a seguir:</p>
            <ul>
              <li>Google Chrome</li>
              <li>Firefox</li>
            </ul>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  name: state.session.user.me.name
});

export default connect(mapStateToProps)(NotSupported);
