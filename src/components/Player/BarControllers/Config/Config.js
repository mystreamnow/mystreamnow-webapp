import React, { Fragment } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
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
