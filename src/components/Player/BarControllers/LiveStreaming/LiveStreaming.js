import React, { Fragment } from 'react';
import { Tooltip, Grid, Icon } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';

const LiveStreaming = () => {
  return (
    <Fragment>
      <Tooltip title='Iniciar transmissão'>
        <Grid>
          <IconButton disableRipple className='btn-icons-btn'>
            <Icon className='btn-icons'>settings_input_antenna</Icon>
            <span className='btn-label'>Transmissão</span>
          </IconButton>
        </Grid>
      </Tooltip>
    </Fragment>
  );
};

export default LiveStreaming;
