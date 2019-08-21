import React from 'react';

import { Box, Tooltip, IconButton, Icon } from '@material-ui/core';

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
