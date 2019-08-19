import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pusher from 'react-pusher';
import OT from '@opentok/client';
import { screenShare, layout } from './../../../actions/Player';
import Request from './../../../Library/Request/Request';
import NotSupported from './../ScreenShare/_includes/errors/NotSupported';

class BarControllers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      supported: false,
    };
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.onUnload);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.onUnload);
  }

  handleStopScreenShare = () => {
    this.screenSharePublisher.destroy();

    this.pusherTrigger('layout', {
      layout: this.props.layout.class[0],
      me: this.props.email,
    });
    this.props.onScreenShare(false);
  };

  addNodeScreenShare() {
    const OTScreen = document.getElementById('OTScreenShare');
    const elem = document.getElementById('col-presentation');

    if (OTScreen === null) {
      const div = document.createElement('div');
      div.setAttribute('id', 'OTScreenShare');
      div.setAttribute('class', 'presentation screen-share-bg');
      elem.appendChild(div);
    }
  }

  showScreenShare = () => {
    const { screenshare } = this.props;

    if (!screenshare) {
      this.addNodeScreenShare();
      OT.checkScreenSharingCapability(response => {
        if (!response.supported || response.extensionRegistered === false) {
          this.setState({
            supported: true,
          });
        } else if (response.extensionInstalled === false) {
          this.setState({
            supported: true,
          });
        } else {
          this.screenSharePublisher = OT.initPublisher(
            'OTScreenShare',
            {
              publishAudio: 'true',
              videoSource: 'screen',
              style: {
                nameDisplayMode: 'off',
                buttonDisplayMode: 'off',
                audioLevelDisplayMode: 'off',
                archiveStatusDisplayMode: 'off',
              },
            },
            error => {
              if (error) {
                this.handleStopScreenShare();
              } else {
                this.props.opentokSession.publish(
                  this.screenSharePublisher,
                  err => {
                    if (err) {
                      console.log(err);
                    }
                  },
                );
              }
            },
          );

          this.Listener(this.screenSharePublisher);
        }
      });
    } else {
      this.handleStopScreenShare();
    }
  };

  pusherTrigger = (event, data) => {
    const { meeting_identified_room } = this.props.session;

    Request.post('no-auth/trigger', {
      channel: `player_${meeting_identified_room}`,
      event: `${event}_${meeting_identified_room}`,
      data: data,
    });
  };

  Listener(screenSharePublisher) {
    screenSharePublisher.on({
      mediaStopped: () => {
        this.handleStopScreenShare();
      },
      streamDestroyed: () => {
        this.handleStopScreenShare();
      },
      streamCreated: () => {
        this.pusherTrigger('layout', {
          layout: this.props.layout.class[1],
          me: this.props.email,
        });

        this.props.onScreenShare(true);
      },
    });
  }

  setLayout = ({ layout }) => {
    this.addNodeScreenShare();
    if (this.props.layout.active !== layout) {
      this.props.onLayout({
        class: this.props.layout.class,
        active: layout,
      });
    }
  };

  render() {
    const { session } = this.props;
    const { supported } = this.state;

    return (
      <div>
        <button onClick={() => this.showScreenShare()}>Compartilhar</button>
        {supported && <NotSupported />}

        <Pusher
          channel={`player_${session.meeting_identified_room}`}
          event={`layout_${session.meeting_identified_room}`}
          onUpdate={response => this.setLayout(response)}
        />
      </div>
    );
  }
}

const mapState = state => {
  return {
    session: state.session.user.session,
    layout: state.Layout,
    opentokSession: state.OpentokSession,
    screenshare: state.ScreenShare,
    email: state.session.user.me.email,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLayout: number => {
      dispatch(layout(number));
    },
    onScreenShare: boolean => {
      dispatch(screenShare(boolean));
    },
  };
};

export default connect(mapState, mapDispatchToProps)(BarControllers);
