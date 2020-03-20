import React, { Component } from "react";
import Hls from "hls.js";

import "./assets/scss/video.scss";

class Player extends Component {
  componentDidMount() {
    if (this.player) {
      const video = this.player;
      const { hls: VideoSource } = this.props;

      if (!Hls.isSupported()) {
        video.src = VideoSource;
      } else {
        // Hls
        const hls = new Hls({ enableWorker: false });
        hls.loadSource(VideoSource);
        hls.attachMedia(video);
      }
    }
  }

  render() {
    return (
      <div id="video_pre_view">
        <video
          controls
          crossOrigin="true"
          ref={player => (this.player = player)}
          autoPlay
          muted
          className="player_video"
        />
      </div>
    );
  }
}

export default Player;
