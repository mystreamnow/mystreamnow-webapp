import React from 'react';
import { Grid, Box } from '@material-ui/core';

import { connect } from 'react-redux';

import './assets/scss/LocaleTransmission.scss';

const LocaleTransmission = ({ meeting_broadcasting }) => {
  return (
    <div id='containerTransmission'>
      <Grid direction='row' container>
        <Grid item>
          <Box mr={2}>Você irá transmitir para as seguintes midias:</Box>
        </Grid>
        <Grid item>
          {meeting_broadcasting.map((result, key) =>
            <Box key={key}>
              <img
                src={require(`./../assets/img/${result.type}.png`)}
                alt={'My Stream Now - Broadcasting'}
              />
            </Box>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

const mapState = state => {
  return {
    meeting_broadcasting: state.session.user.session.meeting_broadcasting
  };
};

export default connect(mapState)(LocaleTransmission);
