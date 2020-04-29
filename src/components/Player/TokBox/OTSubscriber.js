import React, { Component } from "react";
import PropTypes from "prop-types";
import uuid from "uuid";
import { connect } from "react-redux";
import { Fab, Icon } from "@material-ui/core";

class OTSubscriber extends Component {
  constructor(props, context) {
    super(props);

    this.state = {
      subscriber: null,
      stream: props.stream || context.stream || null,
      session: props.session || context.session || null,
      currentRetryAttempt: 0,
      hideCamMic: false,
      streamSub: {
        hasAudio: true,
        hasVideo: true,
      },
    };

    this.maxRetryAttempts = props.maxRetryAttempts || 5;
    this.retryAttemptTimeout = props.retryAttemptTimeout || 1000;
  }

  componentDidMount() {
    this.createSubscriber();

    this.setState({ streamSub: this.state.stream });

    this.state.session.on("streamPropertyChanged", (event) => {
      if (this.state.streamSub.id === event.stream.id) {
        this.setState({ streamSub: event.stream });
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const cast = (value, Type, defaultValue) =>
      value === undefined ? defaultValue : Type(value);

    const updateSubscriberProperty = (key) => {
      const previous = cast(prevProps.properties[key], Boolean, true);
      const current = cast(this.props.properties[key], Boolean, true);
      if (previous !== current) {
        this.state.subscriber[key](current);
      }
    };

    updateSubscriberProperty("subscribeToAudio");
    updateSubscriberProperty("subscribeToVideo");

    if (
      prevState.session !== this.state.session ||
      prevState.stream !== this.state.stream
    ) {
      this.destroySubscriber(prevState.session);
      this.createSubscriber();
    }
  }

  componentWillUnmount() {
    this.destroySubscriber();
  }

  getSubscriber() {
    return this.state.subscriber;
  }

  createSubscriber() {
    if (!this.state.session || !this.state.stream) {
      this.setState({ subscriber: null });
      return;
    }

    const divSubscriber = document.createElement("div");

    if (this.state.stream.videoType === "camera") {
      divSubscriber.setAttribute(
        "class",
        `OTSubscriberContainer sub_${this.state.stream.id}`
      );
      this.node.appendChild(divSubscriber);
    }

    if (this.state.stream.videoType === "screen") {
      const ColParticipants = document.getElementById("col-presentation");

      divSubscriber.setAttribute("id", "OTScreenShare");
      divSubscriber.setAttribute("class", "presentation screen-share-bg");

      ColParticipants.appendChild(divSubscriber);
    }

    this.subscriberId = uuid();
    const { subscriberId } = this;

    const subscriber = this.state.session.subscribe(
      this.state.stream,
      divSubscriber,
      this.props.properties,
      (err) => {
        if (subscriberId !== this.subscriberId) {
          // Either this subscriber has been recreated or the
          // component unmounted so don't invoke any callbacks
          return;
        }
        if (
          err &&
          this.props.retry &&
          this.state.currentRetryAttempt < this.maxRetryAttempts - 1
        ) {
          // Error during subscribe function
          this.handleRetrySubscriber();
          // If there is a retry action, do we want to execute the onError props function?
          // return;
        }
        if (err && typeof this.props.onError === "function") {
          this.props.onError(err);
        } else if (!err && typeof this.props.onSubscribe === "function") {
          this.props.onSubscribe();
        }
      }
    );

    if (
      this.props.eventHandlers &&
      typeof this.props.eventHandlers === "object"
    ) {
      subscriber.on(this.props.eventHandlers);
    }

    this.setState({ subscriber });
  }

  handleRetrySubscriber() {
    setTimeout(() => {
      this.setState((state) => ({
        currentRetryAttempt: state.currentRetryAttempt + 1,
        subscriber: null,
      }));
      this.createSubscriber();
    }, this.retryAttemptTimeout);
  }

  destroySubscriber(session = this.props.session) {
    delete this.subscriberId;

    if (this.state.subscriber) {
      if (
        this.props.eventHandlers &&
        typeof this.props.eventHandlers === "object"
      ) {
        this.state.subscriber.once("destroyed", () => {
          this.state.subscriber.off(this.props.eventHandlers);
        });
      }

      if (session) {
        session.unsubscribe(this.state.subscriber);
      }
    }
  }

  setHideCamMic = (data) => {
    this.setState({ hideCamMic: data.hideCamMic });
  };

  render() {
    // const { user } = this.props;
    const { stream } = this.state;

    return (
      stream.videoType !== "screen" && (
        <div
          id="subscriber"
          ref={(node) => (this.node = node)}
          className="video"
        >
          <div className="box-buttons">
            <Fab
              className={`transparent btn-video ${
                this.state.streamSub.hasVideo ? "" : "inactive"
              } ${this.state.hideCamMic ? "no-show" : ""}`}
            >
              {this.state.streamSub.hasVideo ? (
                <Icon>videocam</Icon>
              ) : (
                <Icon>videocam_off</Icon>
              )}
            </Fab>

            <Fab
              className={`transparent btn-audio ${
                this.state.streamSub.hasAudio ? "" : "inactive"
              } ${this.state.hideCamMic ? "no-show" : ""}`}
            >
              {this.state.streamSub.hasAudio ? (
                <Icon>mic</Icon>
              ) : (
                <Icon>mic_off</Icon>
              )}
            </Fab>

            {/* <Pusher
              channel={`player_${user.session.code}`}
              event={`hide_cam_mic_${user.session.code}`}
              onUpdate={(response) => this.setHideCamMic(response.data)}
            /> */}
          </div>
        </div>
      )
    );
  }
}

OTSubscriber.propTypes = {
  stream: PropTypes.shape({
    streamId: PropTypes.string,
  }),
  session: PropTypes.shape({
    subscribe: PropTypes.func,
    unsubscribe: PropTypes.func,
  }),
  properties: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  retry: PropTypes.bool,
  maxRetryAttempts: PropTypes.number,
  retryAttemptTimeout: PropTypes.number,
  eventHandlers: PropTypes.objectOf(PropTypes.func),
  onSubscribe: PropTypes.func,
  onError: PropTypes.func,
};

OTSubscriber.defaultProps = {
  stream: null,
  session: null,
  properties: {},
  retry: false,
  maxRetryAttempts: 5,
  retryAttemptTimeout: 1000,
  eventHandlers: null,
  onSubscribe: null,
  onError: null,
};

OTSubscriber.contextTypes = {
  stream: PropTypes.shape({
    streamId: PropTypes.string,
  }),
  session: PropTypes.shape({
    subscribe: PropTypes.func,
    unsubscribe: PropTypes.func,
  }),
};

const mapStateToProps = (state) => ({
  user: state.session.user,
});

export default connect(mapStateToProps)(OTSubscriber);
