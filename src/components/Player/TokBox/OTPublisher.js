import React, { Component } from 'react';
import PropTypes from 'prop-types';
import once from 'lodash/once';
import uuid from 'uuid';
import OT from '@opentok/client';
import { connect } from 'react-redux';
import { Fab, Icon, Tooltip } from '@material-ui/core';
import { allowCam, allowMic } from './../../../actions/Player';

class OTPublisher extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pubError: null,
      publisher: null,
      hideCamMic: false,
      lastStreamId: '',
    };
  }

  componentDidMount() {
    this.createPublisher();
  }

  componentDidUpdate(prevProps) {
    const useDefault = (value, defaultValue) =>
      value === undefined ? defaultValue : value;

    const shouldUpdate = (key, defaultValue) => {
      const previous = useDefault(prevProps.properties[key], defaultValue);
      const current = useDefault(this.props.properties[key], defaultValue);
      return previous !== current;
    };

    const updatePublisherProperty = (key, defaultValue) => {
      if (shouldUpdate(key, defaultValue)) {
        const value = useDefault(this.props.properties[key], defaultValue);
        this.state.publisher[key](value);
      }
    };

    if (shouldUpdate('audioSource', undefined)) {
      this.destroyPublisher();
      this.createPublisher();
      return;
    }

    if (shouldUpdate('videoSource', undefined)) {
      this.destroyPublisher();
      this.createPublisher();
      return;
    }

    if (shouldUpdate('fitMode', undefined)) {
      this.destroyPublisher();
      this.createPublisher();
      return;
    }

    updatePublisherProperty('publishAudio', true);
    updatePublisherProperty('publishVideo', true);

    if (this.props.session !== prevProps.session) {
      this.destroyPublisher(prevProps.session);
      this.createPublisher();
    }
  }

  componentWillUnmount() {
    if (this.props.session) {
      this.props.session.off('sessionConnected', this.sessionConnectedHandler);
    }

    this.destroyPublisher();
  }

  getPublisher() {
    return this.state.publisher;
  }

  destroyPublisher(session = this.props.session) {
    delete this.publisherId;

    if (this.state.publisher) {
      this.state.publisher.off('streamCreated', this.streamCreatedHandler);

      if (
        this.props.eventHandlers &&
        typeof this.props.eventHandlers === 'object'
      ) {
        this.state.publisher.once('destroyed', () => {
          this.state.publisher.off(this.props.eventHandlers);
        });
      }

      if (session) {
        session.unpublish(this.state.publisher);
      }
      this.state.publisher.destroy();
    }
  }

  publishToSession(publisher) {
    const { publisherId } = this;

    this.props.session.publish(publisher, err => {
      if (publisherId !== this.publisherId) {
        // Either this publisher has been recreated or the
        // component unmounted so don't invoke any callbacks
        return;
      }
      if (err) {
        this.errorHandler(err);
      } else if (typeof this.props.onPublish === 'function') {
        this.props.onPublish();
      }
    });
  }

  createPublisher() {
    if (!this.props.session) {
      this.setState({ publisher: null, lastStreamId: '' });
      return;
    }

    const properties = this.props.properties || {};
    let container;

    if (properties.insertDefaultUI !== false) {
      container = document.createElement('div');
      container.setAttribute('class', `OTPublisherContainer pub_1`);
      this.node.appendChild(container);
    }

    this.publisherId = uuid();
    const { publisherId } = this;

    this.errorHandler = once(err => {
      if (publisherId !== this.publisherId) {
        // Either this publisher has been recreated or the
        // component unmounted so don't invoke any callbacks
        return;
      }
      if (typeof this.props.onError === 'function') {
        this.props.onError(err);

        if (err.code === 1500 && err.name === 'OT_NO_DEVICES_FOUND') {
          this.setState({ pubError: err });
        }
      }
    });

    const publisher = OT.initPublisher(container, properties, err => {
      if (publisherId !== this.publisherId) {
        // Either this publisher has been recreated or the
        // component unmounted so don't invoke any callbacks
        return;
      }
      if (err) {
        this.errorHandler(err);
      } else if (typeof this.props.onInit === 'function') {
        this.props.onInit();
      }
    });

    publisher.on('streamCreated', this.streamCreatedHandler);

    if (
      this.props.eventHandlers &&
      typeof this.props.eventHandlers === 'object'
    ) {
      publisher.on(this.props.eventHandlers);
    }

    if (this.props.session.connection) {
      this.publishToSession(publisher);
    } else {
      this.props.session.once('sessionConnected', this.sessionConnectedHandler);
    }

    this.setState({ publisher, lastStreamId: '' });
  }

  sessionConnectedHandler = () => {
    this.publishToSession(this.state.publisher);
  };

  streamCreatedHandler = event => {
    this.setState({ lastStreamId: event.stream.id });
  };

  setAllowCam = data => {
    this.props.onAllowCam(!data);
  };

  setAllowMic = data => {
    this.props.onAllowMic(!data);
  };

  render() {
    const { allowCam, allowMic } = this.props;

    return (
      <div id="publisher" ref={node => (this.node = node)}>
        {this.state.pubError === null
          ? <div className="box-buttons">
              <Tooltip
                title={allowCam ? 'Desabilitar' : 'Habilitar'}
                placement="right"
              >
                <Fab
                  className={`transparent btn-video ${allowCam
                    ? ''
                    : 'inactive'} ${this.state.hideCamMic ? 'no-show' : ''}`}
                  onClick={() => this.setAllowCam(allowCam)}
                >
                  {allowCam ? <Icon>videocam</Icon> : <Icon>videocam_off</Icon>}
                </Fab>
              </Tooltip>

              <Tooltip
                title={allowMic ? 'Desabilitar' : 'Habilitar'}
                placement="right"
              >
                <Fab
                  className={`transparent btn-audio ${allowMic
                    ? ''
                    : 'inactive'} ${this.state.hideCamMic ? 'no-show' : ''}`}
                  onClick={() => this.setAllowMic(allowMic)}
                >
                  {allowMic ? <Icon>mic</Icon> : <Icon>mic_off</Icon>}
                </Fab>
              </Tooltip>
            </div>
          : <div className="no-device-found">
              <h4>Não conseguimos detectar sua câmera ou microfone!</h4>
              <p>
                Por favor verifique a instalação da sua câmera ou microfone
                e&nbsp;
                <strong>
                  <a className="pointer" onClick={() => location.reload()}>
                    RECARREGUE A PÁGINA!
                  </a>
                </strong>
              </p>
            </div>}
      </div>
    );
  }
}

OTPublisher.propTypes = {
  session: PropTypes.shape({
    connection: PropTypes.shape({
      connectionId: PropTypes.string,
    }),
    once: PropTypes.func,
    off: PropTypes.func,
    publish: PropTypes.func,
    unpublish: PropTypes.func,
  }),
  properties: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  eventHandlers: PropTypes.objectOf(PropTypes.func),
  onInit: PropTypes.func,
  onPublish: PropTypes.func,
  onError: PropTypes.func,
};

OTPublisher.defaultProps = {
  session: null,
  properties: {},
  eventHandlers: null,
  onInit: null,
  onPublish: null,
  onError: null,
};

const mapStateToProps = state => ({
  camera: state.Camera,
  allowCam: state.AllowCam,
  microphone: state.Microphone,
  user: state.session.user,
  allowMic: state.AllowMic,
});

const mapDispatchToProps = dispatch => {
  return {
    onAllowCam: boolean => {
      dispatch(allowCam(boolean));
    },
    onAllowMic: boolean => {
      dispatch(allowMic(boolean));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OTPublisher);
