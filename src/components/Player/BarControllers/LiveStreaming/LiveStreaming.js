import React, { Fragment } from 'react';

import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';

import IconButton from '@material-ui/core/IconButton';
import StartStreaming from './_includes/StartStreaming';

const LiveStreaming = () => {
  const [open, setOpen] = React.useState(false);

  function handleInvite () {
    setOpen(true);
  }

  return (
    <Fragment>
      <Tooltip title='Iniciar transmissão'>
        <Grid>
          <IconButton
            onClick={handleInvite}
            disableRipple
            className='btn-icons-btn'
          >
            <Icon className='btn-icons'>settings_input_antenna</Icon>
            <span className='btn-label'>Transmissão</span>
          </IconButton>
        </Grid>
      </Tooltip>
      {open && <StartStreaming open={open} setOpen={setOpen} />}
    </Fragment>
  );
};

export default LiveStreaming;
