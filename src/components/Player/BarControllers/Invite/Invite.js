import React, { Fragment } from 'react';

import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Slide from '@material-ui/core/Slide';
import Fab from '@material-ui/core/Fab';
import Send from '@material-ui/icons/Send';

import { makeStyles } from '@material-ui/core/styles';
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
