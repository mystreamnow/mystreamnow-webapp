import React from 'react';

import Publisher from './Publisher';
import Subscriber from './Subscriber';
import { OTSession, OTStreams } from './TokBox';
import { getEnv } from './../../helper/helper';
import { connect } from 'react-redux';

const BodyPlayer = ({ session, token }) => {
  return (
    <div className='row-participants default'>
      <OTSession
        apiKey={getEnv('API_TOKBOX_KEY')}
        sessionId={session}
        token={token}
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
    </div>
  );
};

const mapStateToProps = state => ({
  session: state.session.user.session.meeting_session_id,
  token: state.session.user.session.meeting_token
});

export default connect(mapStateToProps)(BodyPlayer);
