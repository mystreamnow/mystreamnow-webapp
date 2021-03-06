import React, { Fragment } from 'react';

import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';

import IconButton from '@material-ui/core/IconButton';

import './assets/scss/index.scss';

const Help = () => {
  return (
    <Fragment>
      <Tooltip title='Obter suporte da ferramenta'>
        <Grid>
          <IconButton disableRipple className='btn-icons-btn ico-help'>
            <Icon className='btn-icons'>help</Icon>
            <span className='btn-label'>Ajuda</span>
          </IconButton>
        </Grid>
      </Tooltip>
    </Fragment>
  );
};

export default Help;
