import React, { Component } from 'react';
import { connect } from 'react-redux';
import { OTPublisher } from './../TokBox';

import './assets/scss/publisher.scss';

class Publisher extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      fitMode: 'cover',
      videoSource: 'camera',
    };
  }

  onError = err => {
    this.setState({ error: `Failed to publish: ${err.message}` });
    console.error(err);
  };

  render() {
    const { camera, microphone, allowCam, allowMic } = this.props;

    let currentCamera = camera ? camera.deviceId : undefined;
    let currentMicrophone = microphone ? microphone.deviceId : undefined;

    return (
      <React.Fragment>
        <OTPublisher
          initialChecked={this.state.videoSource}
          session={this.props.session}
          properties={{
            fitMode: this.state.fitMode,
            name: 'Michael',
            insertMode: 'replace',
            style: {
              nameDisplayMode: 'auto',
              buttonDisplayMode: 'off',
              audioLevelDisplayMode: 'off',
              archiveStatusDisplayMode: 'off',
            },
            mirror: false,
            publishAudio: allowMic,
            publishVideo: allowCam,
            audioSource: currentMicrophone,
            videoSource:
              this.state.videoSource === 'screen' ? 'screen' : currentCamera,
            range: this.props.range,
          }}
          onError={this.onError}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  camera: state.Camera,
  allowCam: state.AllowCam,
  microphone: state.Microphone,
  allowMic: state.AllowMic,
});

export default connect(mapStateToProps)(Publisher);
