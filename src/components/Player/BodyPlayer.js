import React from 'react';

import Publisher from './Publisher';
import Subscriber from './Subscriber';
import { OTSession, OTStreams } from './TokBox';
import { getEnv } from './../../helper/helper';
import { connect } from 'react-redux';

const BodyPlayer = ({ session, token, layout }) => {
  return (
    <React.Fragment>
      <div className={`row-participants ${layout.active}`}>
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
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  session: state.session.user.session.meeting_session_id,
  token: state.session.user.session.meeting_token,
  layout: state.Layout
});

export default connect(mapStateToProps)(BodyPlayer);
