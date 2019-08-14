import React from 'react';

import Publisher from './Publisher';
import Subscriber from './Subscriber';
import { OTSession, OTStreams } from './TokBox';
import { getEnv } from './../../helper/helper';

const BodyPlayer = ({ meeting_session_id, meeting_token }) => {
  return (
    <div className='row-participants default'>
      <OTSession
        apiKey={getEnv('API_TOKBOX_KEY')}
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
    </div>
  );
};

export default BodyPlayer;
