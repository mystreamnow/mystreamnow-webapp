import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fab from '@material-ui/core/Fab';
import PlayArrow from '@material-ui/icons/PlayArrow';
import Stop from '@material-ui/icons/Stop';

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
    setLoadingStop(false);
    setLoadingStart(true);
    onBroadcastingStart();
  }

  function handleStopBroadcasting () {
    setLoadingStart(false);
    setLoadingStop(true);
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
          {!loadingStop &&
          <Button onClick={handleClose} color='secondary'>
                Fechar
              </Button>}
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
