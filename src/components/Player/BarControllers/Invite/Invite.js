import React, { Fragment } from 'react';
import { Tooltip, Grid, Icon } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';

const Invite = () => {
  return (
    <Fragment>
      <Tooltip title='Convidar participante'>
        <Grid>
          <IconButton disableRipple className='btn-icons-btn'>
            <Icon className='btn-icons'>launch</Icon>
            <span className='btn-label'>Convidar</span>
          </IconButton>
        </Grid>
      </Tooltip>
    </Fragment>
  );
};

export default Invite;
