import React from 'react';

import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

import './assets/scss/index.scss';

const Exit = () => {
  function handleDecision ({ currentTarget }) {
    console.log(currentTarget);
  }

  return (
    <Box id='exit-component'>
      <Tooltip title='Sair ou Encerrar'>
        <IconButton
          onClick={handleDecision}
          disableRipple
          className='btn-control active'
        >
          <Icon className='btn-cb-icon'>exit_to_app</Icon>
          <span className='btn-cb-label'>Sair</span>
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default Exit;
