import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import { connect } from 'react-redux';
import { Fab, Icon } from '@material-ui/core';

class OTSubscriber extends Component {
  constructor(props) {
    super(props);

    this.state = {
      subscriber: null,
      hideCamMic: false,
      streamSub: {
        hasAudio: true,
        hasVideo: true,
      },
    };
  }

  componentDidMount() {
    this.createSubscriber();

    this.setState({ streamSub: this.props.stream });

    this.props.session.on('streamPropertyChanged', event => {
      if (this.state.streamSub.id === event.stream.id) {
        this.setState({ streamSub: event.stream });
      }
    });
  }

  componentDidUpdate(prevProps) {
    const cast = (value, Type, defaultValue) =>
      value === undefined ? defaultValue : Type(value);

    const updateSubscriberProperty = key => {
      const previous = cast(prevProps.properties[key], Boolean, true);
      const current = cast(this.props.properties[key], Boolean, true);
      if (previous !== current) {
        this.state.subscriber[key](current);
      }
    };

    updateSubscriberProperty('subscribeToAudio');
    updateSubscriberProperty('subscribeToVideo');

    if (
      this.props.session !== prevProps.session ||
      this.props.stream !== prevProps.stream
    ) {
      this.destroySubscriber(prevProps.session);
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
    if (!this.props.session || !this.props.stream) {
      this.setState({ subscriber: null });
      return;
    }

    const container = document.createElement('div');
    if (this.props.stream.videoType != 'screen') {
      container.setAttribute(
        'class',
        `OTSubscriberContainer sub_${this.props.stream.id}`,
      );
      this.node.appendChild(container);
    }

    this.subscriberId = uuid();
    const { subscriberId } = this;

    const subscriber = this.props.session.subscribe(
      this.props.stream,
      this.props.stream.videoType == 'screen' ? 'OTScreenShare' : container,
      this.props.properties,
      err => {
        if (subscriberId !== this.subscriberId) {
          // Either this subscriber has been recreated or the
          // component unmounted so don't invoke any callbacks
          return;
        }
        if (err && typeof this.props.onError === 'function') {
          this.props.onError(err);
        } else if (!err && typeof this.props.onSubscribe === 'function') {
          this.props.onSubscribe();
        }
      },
    );

    if (
      this.props.eventHandlers &&
      typeof this.props.eventHandlers === 'object'
    ) {
      subscriber.on(this.props.eventHandlers);
    }

    this.setState({ subscriber });
  }

  destroySubscriber(session = this.props.session) {
    delete this.subscriberId;

    if (this.state.subscriber) {
      if (
        this.props.eventHandlers &&
        typeof this.props.eventHandlers === 'object'
      ) {
        this.state.subscriber.once('destroyed', () => {
          this.state.subscriber.off(this.props.eventHandlers);
        });
      }

      if (session) {
        session.unsubscribe(this.state.subscriber);
      }
    }
  }

  setHideCamMic = data => {
    this.setState({ hideCamMic: data.hideCamMic });
  };

  setStreamFull() {
    const userData = JSON.parse(this.props.stream.connection.data);

    if (this.props.streamFull && this.props.streamFull.full) {
      if (this.props.streamFull.me == userData.email) {
        const { streamFull } = this.props;
        return `video full${streamFull.middle ? ' middle' : ''}`;
      } else {
        return 'video hide';
      }
    }

    return 'video';
  }

  render() {
    const { stream } = this.props;

    return (
      stream.videoType != 'screen' &&
      <div
        id="subscriber"
        ref={node => (this.node = node)}
        className={this.setStreamFull()}
      >
        <div className="box-buttons">
          <Fab
            className={`transparent btn-video ${this.state.streamSub.hasVideo
              ? ''
              : 'inactive'} ${this.state.hideCamMic ? 'no-show' : ''}`}
          >
            {this.state.streamSub.hasVideo
              ? <Icon>videocam</Icon>
              : <Icon>videocam_off</Icon>}
          </Fab>

          <Fab
            className={`transparent btn-audio ${this.state.streamSub.hasAudio
              ? ''
              : 'inactive'} ${this.state.hideCamMic ? 'no-show' : ''}`}
          >
            {this.state.streamSub.hasAudio
              ? <Icon>mic</Icon>
              : <Icon>mic_off</Icon>}
          </Fab>

          {/* <Pusher
              channel={`player_${user.session.code}`}
              event={`hide_cam_mic_${user.session.code}`}
              onUpdate={response => this.setHideCamMic(response.data)}
            /> */}
        </div>
      </div>
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
  eventHandlers: PropTypes.objectOf(PropTypes.func),
  onSubscribe: PropTypes.func,
  onError: PropTypes.func,
};

OTSubscriber.defaultProps = {
  stream: null,
  session: null,
  properties: {},
  eventHandlers: null,
  onSubscribe: null,
  onError: null,
};

const mapStateToProps = state => ({
  user: state.session.user,
});

export default connect(mapStateToProps)(OTSubscriber);
