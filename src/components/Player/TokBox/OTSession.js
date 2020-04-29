/* eslint-disable react/no-deprecated */
import { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { streams, opentokSession } from "./../../../actions/Player";

import createSession from "./createSession";

class OTSession extends Component {
  constructor(props) {
    super(props);

    this.state = {
      streams: [],
    };
  }

  getChildContext() {
    return { session: this.sessionHelper.session, streams: this.state.streams };
  }

  componentWillMount() {
    this.createSession();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.apiKey !== this.props.apiKey ||
      prevProps.sessionId !== this.props.sessionId ||
      prevProps.token !== this.props.token
    ) {
      this.createSession();
    }
  }

  componentWillUnmount() {
    this.destroySession();
  }

  createSession() {
    this.destroySession();

    this.sessionHelper = createSession({
      apiKey: this.props.apiKey,
      sessionId: this.props.sessionId,
      token: this.props.token,
      onStreamsUpdated: (streams) => {
        this.setState({ streams });
      },
      onConnect: this.props.onConnect,
      onError: this.props.onError,
      options: this.props.options,
    });

    if (
      this.props.eventHandlers &&
      typeof this.props.eventHandlers === "object"
    ) {
      this.sessionHelper.session.on(this.props.eventHandlers);
    }

    const { streams, session } = this.sessionHelper;
    this.setState({ streams });
    this.props.onSession(session);
  }

  destroySession() {
    if (this.sessionHelper) {
      if (
        this.props.eventHandlers &&
        typeof this.props.eventHandlers === "object"
      ) {
        this.sessionHelper.session.off(this.props.eventHandlers);
      }
      this.sessionHelper.disconnect();
    }
  }

  render() {
    return this.props.children;
  }
}

OTSession.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  apiKey: PropTypes.string.isRequired,
  sessionId: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  eventHandlers: PropTypes.objectOf(PropTypes.func),
  onConnect: PropTypes.func,
  onError: PropTypes.func,
  options: PropTypes.object,
};

OTSession.defaultProps = {
  eventHandlers: null,
  onConnect: null,
  onError: null,
  options: {},
};

OTSession.childContextTypes = {
  streams: PropTypes.arrayOf(PropTypes.object),
  session: PropTypes.shape({
    subscribe: PropTypes.func,
    unsubscribe: PropTypes.func,
  }),
};

const mapStateToProps = (state) => ({
  streams: state.Streams,
  user: state.session.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setStreams: (count) => {
      dispatch(streams(count));
    },
    onSession: (data) => {
      dispatch(opentokSession(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OTSession);
