import React, { Component } from 'react';
import { OTSubscriber } from './../TokBox';

export default class Subscriber extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      audio: true,
      video: true,
    };
  }

  // componentDidMount() {
  //   this.changeName(this.props.stream.id);
  // }

  // changeName(streamId) {
  //   let elementSub = document.querySelector(`.sub_${streamId}`);
  //   if (elementSub) {
  //     let elementName = elementSub.querySelector('.OT_name');
  //     if (jsonValid(elementName.innerText)) {
  //       elementName.innerText = JSON.parse(elementName.innerText).name;
  //     }
  //   }
  // }

  onError = err => {
    this.setState({ error: `Failed to subscribe: ${err.message}` });
    console.error(err);
  };

  render() {
    return (
      <OTSubscriber
        stream={this.props.stream}
        session={this.props.session}
        properties={{
          subscribeToAudio: this.state.audio,
          subscribeToVideo: this.state.video,
          style: {
            nameDisplayMode: 'auto',
            buttonDisplayMode: 'off',
            audioLevelDisplayMode: 'off',
            archiveStatusDisplayMode: 'off',
          },
        }}
        onError={this.onError}
      />
    );
  }
}
