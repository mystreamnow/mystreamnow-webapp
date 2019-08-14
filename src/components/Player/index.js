import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import ContainerPlayer from './ContainerPlayer';

const App = ({ user }) => {
  if (user) {
    return (
      <div id='container_player'>
        <ContainerPlayer />
      </div>
    );
  } else {
    return <div>Loading</div>;
  }
};

const mapStateToProps = state => ({
  user: state.session.user.me,
  session: state.session.user.session
});

export default connect(mapStateToProps)(withRouter(App));
