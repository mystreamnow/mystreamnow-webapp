import React, { Fragment } from 'react';
import { Tooltip, Grid, Icon } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';

const Layout = () => {
  return (
    <Fragment>
      <Tooltip title='Trocar o layout'>
        <Grid>
          <IconButton disableRipple className='btn-icons-btn'>
            <Icon className='btn-icons'>dashboard</Icon>
            <span className='btn-label'>Layout</span>
          </IconButton>
        </Grid>
      </Tooltip>
    </Fragment>
  );
};

export default Layout;
