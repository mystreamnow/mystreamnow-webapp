import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';

import ContainerLayout from './../ContainerLayout/ContainerLayout';
import LocaleTransmission from './../LocaleTransmission/LocaleTransmission';
import Player from './Player';

const DialogContentBroadcasting = ({ broadcastingon, hls }) => {
  return (
    <Fragment>
      {!broadcastingon
        ? <DialogContent>
          <DialogContentText>
              Escolha o layout que você deseja iniciar sua transmissão:
            </DialogContentText>
          <ContainerLayout />
          <LocaleTransmission />
        </DialogContent>
        : <DialogContent>
          <DialogContentText>
              Sua transmissão foi iniciado com sucesso e você pode assistir o
              resultado logo a seguir:
            </DialogContentText>
          <Player hls={hls} />
        </DialogContent>}
    </Fragment>
  );
};

const mapState = state => {
  return {
    layoutbroadcast: state.layoutbroadcast,
    broadcastingon: state.broadcastingon,
    hls: state.broadcastingStart.data.hls
  };
};

export default connect(mapState)(DialogContentBroadcasting);
