import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pusher from 'react-pusher';
import OT from '@opentok/client';
import { Tooltip, Grid, Icon, CircularProgress } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';

import './assets/scss/index.scss';

import { screenShare, layout, aspectRatio } from './../../../actions/Player';
import Request from './../../../Library/Request/Request';
import NotSupported from './../ScreenShare/_includes/errors/NotSupported';

import Layout from './Layout/Layout';
import Invite from './Invite/Invite';
import Config from './Config/Config';
import Chat from './Chat/Chat';
import Help from './Help/Help';
import LiveStreaming from './LiveStreaming/LiveStreaming';

class BarControllers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      supported: false,
      loadingSreenShare: true,
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
    this.setState({
      loadingSreenShare: true,
    });
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
          this.props.onScreenShare(true);
          this.setState({
            loadingSreenShare: false,
          });
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
        this.setState({
          loadingSreenShare: true,
        });
        this.pusherTrigger('layout', {
          layout: this.props.layout.class[1],
          me: this.props.email,
        });
      },
    });
  }

  setLayout = ({ layout }) => {
    if (this.props.layout.active !== layout) {
      this.props.onLayout({
        class: this.props.layout.class,
        active: layout,
      });
    }
  };

  render() {
    const { session, screenshare, aspectratio } = this.props;
    const { supported, loadingSreenShare } = this.state;

    return (
      <div id="bar-controllers">
        <div id="controls">
          <div className="control">
            <LiveStreaming />

            <Tooltip
              title={
                screenshare
                  ? 'Parar compartilhamento de tela'
                  : 'Compartilhar a sua tela'
              }
            >
              <Grid>
                <IconButton
                  onClick={() => this.showScreenShare()}
                  disableRipple
                  className={
                    screenshare ? 'btn-icons-btn active' : 'btn-icons-btn'
                  }
                >
                  {loadingSreenShare
                    ? <Icon className="btn-icons">
                        {screenshare ? 'stop_screen_share' : 'screen_share'}
                      </Icon>
                    : <CircularProgress color="primary" />}

                  <span className="btn-label">
                    {screenshare ? 'Parar' : 'Compartilhar'}
                  </span>
                </IconButton>
                {supported && <NotSupported />}
              </Grid>
            </Tooltip>

            <Tooltip title="Colocar em tela Cheia">
              <Grid>
                <IconButton
                  onClick={() => this.props.onAspectRatio(!aspectratio)}
                  disableRipple
                  className={
                    aspectratio ? 'btn-icons-btn active' : 'btn-icons-btn'
                  }
                >
                  <Icon className="btn-icons">aspect_ratio</Icon>
                  <span className="btn-label">Expandir</span>
                </IconButton>
              </Grid>
            </Tooltip>

            <Chat />

            <Layout />

            <Invite />

            <span className="separator_icons" />

            <Config />

            <Help />
          </div>
        </div>

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
    aspectratio: state.aspectratio,
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
    onAspectRatio: boolean => {
      dispatch(aspectRatio(boolean));
    },
  };
};

export default connect(mapState, mapDispatchToProps)(BarControllers);
