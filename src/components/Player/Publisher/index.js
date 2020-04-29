import React, { Component } from "react";
import { connect } from "react-redux";
import { OTPublisher } from "./../TokBox";

import "./assets/scss/publisher.scss";
import Error from "./_includes/errors";

class Publisher extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
      codeError: false,
      fitMode: "cover",
      videoSource: "camera",
    };
  }

  onError = (err) => {
    this.setState({ error: true, codeError: err.code });
  };

  render() {
    const { camera, microphone, allowCam, allowMic, name } = this.props;

    let currentCamera = camera ? camera.deviceId : undefined;
    let currentMicrophone = microphone ? microphone.deviceId : undefined;

    return (
      <React.Fragment>
        <OTPublisher
          initialChecked={this.state.videoSource}
          properties={{
            fitMode: this.state.fitMode,
            name: name,
            insertMode: "replace",
            style: {
              nameDisplayMode: "auto",
              buttonDisplayMode: "off",
              audioLevelDisplayMode: "on",
              archiveStatusDisplayMode: "off",
            },
            mirror: false,
            publishAudio: allowMic,
            publishVideo: allowCam,
            audioSource: currentMicrophone,
            videoSource:
              this.state.videoSource === "screen" ? "screen" : currentCamera,
            range: this.props.range,
          }}
          onError={this.onError}
        />
        {this.state.error && <Error code={this.state.codeError} />}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  camera: state.Camera,
  allowCam: state.AllowCam,
  microphone: state.Microphone,
  allowMic: state.AllowMic,
  name: state.session.user.me.name,
});

export default connect(mapStateToProps)(Publisher);
