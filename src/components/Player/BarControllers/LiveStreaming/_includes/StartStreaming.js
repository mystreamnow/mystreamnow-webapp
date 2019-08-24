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
  Grid,
  Fab,
  CardActionArea,
  Card,
  CardMedia,
  CardContent
} from '@material-ui/core';

import { useTheme, makeStyles } from '@material-ui/core/styles';
import Send from '@material-ui/icons/Send';
const Transition = React.forwardRef(function Transition (props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});
const useStyles = makeStyles(theme => ({
  Send: {
    marginRight: theme.spacing(1)
  },
  card: {
    maxWidth: 345
  },
  media: {
    height: 263
  }
}));

const StartStreaming = ({ open, setOpen }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();

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
        <Grid container justify='center' alignItems='center' direction='row'>
          <Grid item xs={4}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image='/img/bestfit.png'
                  title='My Stream Now - Streaming Bestfit'
                />
                <CardContent>Melhor disposição de câmeras</CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image='/img/verticalPresentation.png'
                  title='My Stream Now - Vertical Presentation'
                />
                <CardContent>Layout com apresentação vertical</CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image='/img/horizontalPresentation.png'
                  title='My Stream Now - Horizontal Presentation'
                />
                <CardContent>Layout com apresentação horizontal</CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
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
          <Send className={classes.Send} />
          Enviar
        </Fab>
      </DialogActions>
    </Dialog>
  );
};

export default StartStreaming;
