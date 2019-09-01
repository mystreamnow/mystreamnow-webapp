import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import Icon from '@material-ui/core/Icon';
import Box from '@material-ui/core/Box';

import './assets/scss/Infos.scss';

const Infos = ({ name }) => {
  return (
    <Fragment>
      <Box className='container_name'>
        <Icon>account_circle</Icon>
        <p>
          {name}
        </p>
      </Box>
    </Fragment>
  );
};

const mapState = state => {
  return {
    name: state.session.user.me.name
  };
};

export default connect(mapState)(Infos);
