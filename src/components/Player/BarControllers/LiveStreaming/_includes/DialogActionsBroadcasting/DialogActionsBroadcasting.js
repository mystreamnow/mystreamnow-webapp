import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  DialogActions,
  CircularProgress,
  Fab
} from '@material-ui/core';

import { PlayArrow, Stop } from '@material-ui/icons';
import {
  startBroadcasting,
  stopBroadcasting
} from './../../../../../../actions/Player';

const DialogActionsBroadcasting = ({
  broadcastingon,
  layoutbroadcast,
  onBroadcastingStart,
  onBroadcastingStop,
  handleClose
}) => {
  const [loadingStart, setLoadingStart] = useState(false);
  const [loadingStop, setLoadingStop] = useState(false);

  function handleStartBroadcasting () {
    setLoadingStart(true);
    onBroadcastingStart();
  }

  function handleStopBroadcasting () {
    setLoadingStop(false);
    onBroadcastingStop();
  }

  return (
    <Fragment>
      {!broadcastingon
        ? <DialogActions>
          {!loadingStart &&
          <Button onClick={handleClose} color='secondary'>
                Cancelar
              </Button>}
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
          {loadingStop
              ? <div id='progress_broadcasting_start'>
                <CircularProgress />
              </div>
              : <Fab
                aria-label='send'
                variant='extended'
                onClick={handleStopBroadcasting}
                color='secondary'
                >
                <Stop className='send' />
                  Parar a transmissão
                </Fab>}
        </DialogActions>}
    </Fragment>
  );
};

const mapState = state => {
  return {
    layoutbroadcast: state.layoutbroadcast,
    broadcastingon: state.broadcastingon
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onBroadcastingStart: () => {
      dispatch(startBroadcasting());
    },
    onBroadcastingStop: () => {
      dispatch(stopBroadcasting());
    }
  };
};

export default connect(mapState, mapDispatchToProps)(DialogActionsBroadcasting);
