import React, { Fragment } from 'react';
import { Tooltip, Grid, Icon } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';

const Help = () => {
  return (
    <Fragment>
      <Tooltip title='Obter suporte da ferramenta'>
        <Grid>
          <IconButton disableRipple className='btn-icons-btn'>
            <Icon className='btn-icons'>help</Icon>
            <span className='btn-label'>Ajuda</span>
          </IconButton>
        </Grid>
      </Tooltip>
    </Fragment>
  );
};

export default Help;
