import React, { Fragment } from 'react';

import {
  DialogTitle,
  DialogContentText,
  DialogContent,
  Tooltip,
  Grid,
  Icon,
  Button,
  TextField,
  Dialog,
  DialogActions,
  IconButton,
  useMediaQuery,
  Slide,
  Fab
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Send from '@material-ui/icons/Send';

import { useTheme } from '@material-ui/core/styles';

const Transition = React.forwardRef(function Transition (props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
  Send: {
    marginRight: theme.spacing(1)
  }
}));

const Invite = () => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();

  function handleSendInvite () {
    setOpen(true);
  }

  function handleClose () {
    setOpen(false);
  }

  function handleInvite () {
    setOpen(true);
    console.log('handleInvite');
  }

  return (
    <Fragment>
      <Tooltip title='Convidar participante'>
        <Grid>
          <IconButton
            onClick={handleInvite}
            disableRipple
            className='btn-icons-btn'
          >
            <Icon className='btn-icons'>launch</Icon>
            <span className='btn-label'>Convidar</span>
          </IconButton>
        </Grid>
      </Tooltip>

      <Dialog
        fullScreen={fullScreen}
        fullWidth
        maxWidth='md'
        TransitionComponent={Transition}
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Enviar convite</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Digite o e-mail da pessoa que você deseja convidar:
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='email'
            label='Endereço de email'
            type='email'
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='secondary'>
            Cancelar
          </Button>
          <Fab
            aria-label='send'
            variant='extended'
            onClick={handleSendInvite}
            color='primary'
          >
            <Send className={classes.Send} />
            Enviar
          </Fab>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default Invite;
