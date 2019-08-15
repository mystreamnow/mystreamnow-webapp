import React, { Fragment } from 'react';

import './../assets/index.scss';
import BodyPlayer from '../BodyPlayer';
import BarControllers from '../BarControllers';

const ContainerPlayer = () => {
  return (
    <Fragment>
      <div id='body_player'>
        <BodyPlayer />
      </div>
      <div>
        <BarControllers />
      </div>
    </Fragment>
  );
};

export default ContainerPlayer;
