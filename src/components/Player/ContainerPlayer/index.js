import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Fullscreen from 'react-full-screen';

import BodyPlayer from '../BodyPlayer';
import BarControllers from '../BarControllers';
import Presentation from './../Presentation/Presentation';
import { aspectRatio } from './../../../actions/Player';

const ContainerPlayer = ({ layout, aspectratio, onAspectRatio }) => {
  return (
    <Fragment>
      <Fullscreen
        enabled={aspectratio}
        onChange={isFull => onAspectRatio(isFull)}
      >
        <div id='body_player'>
          <BodyPlayer />

          <Presentation noStart={layout.active != layout.class[1]} />
        </div>
        <BarControllers />
      </Fullscreen>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  layout: state.Layout,
  streams: state.Streams,
  aspectratio: state.aspectratio
});

const mapDispatchToProps = dispatch => {
  return {
    onAspectRatio: boolean => {
      dispatch(aspectRatio(boolean));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContainerPlayer);
