import React from 'react';
import { Grid, Box } from '@material-ui/core';

import facebook from './../assets/img/facebook.png';
import youtube from './../assets/img/youtube.png';

import './assets/scss/LocaleTransmission.scss';

const LocaleTransmission = () => {
  return (
    <div id='containerTransmission'>
      <Grid direction='row' container>
        <Grid item>Você irá transmitir para as seguintes midias:</Grid>
        <Grid item>
          <Box ml={2}>
            <img src={facebook} alt='My Stream Now - Facebook' />
          </Box>
          <Box>
            <img src={youtube} alt='My Stream Now - YouTube' />{' '}
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default LocaleTransmission;
