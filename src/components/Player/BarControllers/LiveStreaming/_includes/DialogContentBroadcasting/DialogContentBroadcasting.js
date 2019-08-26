import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { DialogContentText, DialogContent } from '@material-ui/core';

import ContainerLayout from './../ContainerLayout/ContainerLayout';
import LocaleTransmission from './../LocaleTransmission/LocaleTransmission';
import Player from './Player';

const DialogContentBroadcasting = ({ broadcastingstartloading, hls }) => {
  return (
    <Fragment>
      {broadcastingstartloading
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
    broadcastingstartloading: state.broadcastingStart.loading,
    hls: state.broadcastingStart.data.hls
  };
};

export default connect(mapState)(DialogContentBroadcasting);
