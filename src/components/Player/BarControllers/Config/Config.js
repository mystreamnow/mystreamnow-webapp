import React, { Fragment } from 'react';
import { Tooltip, Grid, Icon } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';

const Config = () => {
  return (
    <Fragment>
      <Tooltip title='Configurações de câmera e audio'>
        <Grid>
          <IconButton disableRipple className='btn-icons-btn'>
            <Icon className='btn-icons'>settings</Icon>
            <span className='btn-label'>Configurações</span>
          </IconButton>
        </Grid>
      </Tooltip>
    </Fragment>
  );
};

export default Config;
