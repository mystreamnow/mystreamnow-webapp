import React, { Fragment } from 'react';

import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';

import IconButton from '@material-ui/core/IconButton';

const Chat = () => {
  return (
    <Fragment>
      <Tooltip title='Conversar no chat'>
        <Grid>
          <IconButton disableRipple className='btn-icons-btn'>
            <Icon className='btn-icons'>chat</Icon>
            <span className='btn-label'>Chat</span>
          </IconButton>
        </Grid>
      </Tooltip>
    </Fragment>
  );
};

export default Chat;
