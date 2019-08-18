import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import BodyPlayer from '../BodyPlayer';
import BarControllers from '../BarControllers';
import Presentation from './../Presentation/Presentation';

const ContainerPlayer = ({ layout }) => {
  return (
    <Fragment>
      <div id='body_player'>
        <BodyPlayer />

        <Presentation noStart={layout.active != layout.class[1]} />
      </div>
      <div>
        <BarControllers />
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  layout: state.Layout,
  streams: state.Streams
});

export default connect(mapStateToProps)(ContainerPlayer);
