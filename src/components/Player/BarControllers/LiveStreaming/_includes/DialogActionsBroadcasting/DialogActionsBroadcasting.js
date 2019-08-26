import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  DialogActions,
  CircularProgress,
  Fab
} from '@material-ui/core';

import { PlayArrow, Stop } from '@material-ui/icons';
import { startBroadcasting } from './../../../../../../actions/Player';

const DialogActionsBroadcasting = ({
  broadcastingstartloading,
  layoutbroadcast,
  onBroadcastingStart,
  handleClose
}) => {
  const [loadingStart, setLoadingStart] = useState(false);

  function handleStartBroadcasting () {
    setLoadingStart(true);
    onBroadcastingStart();
  }

  return (
    <Fragment>
      {broadcastingstartloading
        ? <DialogActions>
          <Button onClick={handleClose} color='secondary'>
              Cancelar
            </Button>
          {loadingStart
              ? <div id='progress_broadcasting_start'>
                <CircularProgress />
              </div>
              : <Fab
                aria-label='send'
                variant='extended'
                onClick={handleStartBroadcasting}
                color='primary'
                disabled={layoutbroadcast.active === ''}
                >
                <PlayArrow className='send' />
                  Iniciar transmissão
                </Fab>}
        </DialogActions>
        : <DialogActions>
          <Button onClick={handleClose} color='secondary'>
              Fechar
            </Button>
          <Fab
            aria-label='send'
            variant='extended'
            onClick={handleClose}
            color='secondary'
            >
            <Stop className='send' />
              Parar a transmissão
            </Fab>
        </DialogActions>}
    </Fragment>
  );
};

const mapState = state => {
  return {
    layoutbroadcast: state.layoutbroadcast,
    broadcastingstartloading: state.broadcastingStart.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onBroadcastingStart: () => {
      dispatch(startBroadcasting());
    }
  };
};

export default connect(mapState, mapDispatchToProps)(DialogActionsBroadcasting);
