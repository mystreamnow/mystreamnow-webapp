import React from 'react';

import './../assets/index.scss';
import BodyPlayer from '../BodyPlayer';

const ContainerPlayer = ({ meeting_session_id, meeting_token }) => {
  return (
    <div id='body_player'>
      <BodyPlayer
        meeting_session_id={meeting_session_id}
        meeting_token={meeting_token}
      />
    </div>
  );
};

export default ContainerPlayer;
