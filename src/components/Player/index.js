import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import ContainerPlayer from './ContainerPlayer';

const App = ({ user, session }) => {
  if (user) {
    const { meeting_session_id, meeting_token } = session;

    return (
      <div id='container_player'>
        <ContainerPlayer
          meeting_session_id={meeting_session_id}
          meeting_token={meeting_token}
        />
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
