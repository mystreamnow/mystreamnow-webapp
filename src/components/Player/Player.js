import React, { Component } from "react";
import Publisher from "./Publisher";
import Subscriber from "./Subscriber";
import { OTSession, OTStreams } from "./TokBox";
import { getEnv } from "./../../helper/helper";
import { connect } from "react-redux";

import { connectedSession } from "./../../actions/Player";

class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      connected: false,
    };

    this.sessionEvents = {
      sessionConnected: () => {
        this.props.onUserConnected(true);
      },
      sessionDisconnected: () => {
        this.props.onUserConnected(false);
      },
    };
  }

  onError = (err) => {
    this.setState({ error: `Failed to connect: ${err.message}` });
  };

  render() {
    const { session, token } = this.props;
    return (
      <OTSession
        apiKey={getEnv("API_TOKBOX_KEY")}
        sessionId={session}
        token={token}
        eventHandlers={this.sessionEvents}
        // options={{
        //   connectionEventsSuppressed: true,
        // }}
        //https://tokbox.com/developer/guides/broadcast/live-interactive-video/#suppressing-connection-events
      >
        {this.state.error ? <div>{this.state.error}</div> : null}
        <Publisher />

        <OTStreams
          countStreams={() => {
            return 1;
          }}
        >
          <Subscriber />
        </OTStreams>
      </OTSession>
    );
  }
}

const mapState = () => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUserConnected: (bool) => {
      dispatch(connectedSession(bool));
    },
  };
};

export default connect(mapState, mapDispatchToProps)(Player);
