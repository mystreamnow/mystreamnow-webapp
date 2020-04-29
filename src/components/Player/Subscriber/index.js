import React, { Component } from "react";
import { OTSubscriber } from "./../TokBox";

import "./assets/scss/subscriber.scss";

export default class Subscriber extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      audio: true,
      video: true,
    };
  }

  onError = (err) => {
    this.setState({ error: `Failed to subscribe: ${err.message}` });
    console.error(err);
  };

  render() {
    return (
      <OTSubscriber
        properties={{
          subscribeToAudio: this.state.audio,
          subscribeToVideo: this.state.video,
          style: {
            nameDisplayMode: "auto",
            buttonDisplayMode: "off",
            audioLevelDisplayMode: "off",
            archiveStatusDisplayMode: "off",
          },
        }}
        className="video"
        onError={this.onError}
        retry={true}
        maxRetryAttempts={3}
        retryAttemptTimeout={2000}
      />
    );
  }
}
