import React from 'react';
import { connect } from 'react-redux';

import Player from './Player';
import LoadingModal from './HelperComponents/LoadingModal/LoadingModal';

const BodyPlayer = ({ session, token, layout }) => {
  return (
    <React.Fragment>
      <div className={`row-participants ${layout.active}`}>
        <Player session={session} token={token} />
      </div>
      <LoadingModal />
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  session: state.session.user.session.meeting_session_id,
  token: state.session.user.session.meeting_token,
  layout: state.Layout
});

export default connect(mapStateToProps)(BodyPlayer);
