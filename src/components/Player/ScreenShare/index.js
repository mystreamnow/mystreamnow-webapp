import React, { useState } from 'react';
import OT from '@opentok/client';
import { connect } from 'react-redux';
import NotSupported from './_includes/errors/NotSupported';

const ScreenShare = ({ opentokSession }) => {
  const [supported, setSupported] = useState(false);

  let enebleScreenShare = () => {
    OT.checkScreenSharingCapability(response => {
      if (!response.supported || response.extensionRegistered === false) {
        setSupported(true);
      } else {
        const screenSharePublisher = OT.initPublisher(
          'OTScreenShare',
          {
            publishAudio: 'true',
            videoSource: 'screen',
            style: {
              nameDisplayMode: 'off',
              buttonDisplayMode: 'off',
              audioLevelDisplayMode: 'off',
              archiveStatusDisplayMode: 'off'
            }
          },
          error => {
            if (error) {
              console.log(error);
            } else {
              opentokSession.publish(screenSharePublisher, err => {
                if (err) {
                  console.log(err);
                }
              });
            }
          }
        );
      }
    });
  };

  return (
    <div>
      <button onClick={() => enebleScreenShare()}>Teste</button>
      {supported && <NotSupported />}
    </div>
  );
};

const mapStateToProps = state => ({
  opentokSession: state.OpentokSession
});

export default connect(mapStateToProps)(ScreenShare);
