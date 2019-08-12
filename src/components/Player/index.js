import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Publisher from './Publisher';
import Subscriber from './Subscriber';
import { OTSession, OTStreams } from './TokBox';

import './assets/index.scss';

const App = ({ user, session }) => {
  if (user) {
    const { meeting_session_id, meeting_token } = session;

    return (
      <Fragment>
        <OTSession
          apiKey='46216882'
          sessionId={meeting_session_id}
          token={meeting_token}
        >
          <Publisher />

          <OTStreams
            countStreams={() => {
              return 1;
            }}
          >
            <Subscriber />
          </OTStreams>
        </OTSession>
      </Fragment>
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
