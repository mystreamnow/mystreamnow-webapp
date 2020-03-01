import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { layout } from "./../../actions/Player";
import Request from "./../../Library/Request/Request";

import ContainerPlayer from "./ContainerPlayer";

import "./assets/loading.scss";

const App = ({ user, layout, onLayout, session }) => {
  const [starPlayer, setStarPlayer] = useState(false);

  useEffect(() => {
    let getStartPlayer = async () => {
      if (user) {
        let { data } = await Request.get(
          `/no-auth/configs/${session.meeting_id}`
        );

        if (data) {
          const { layout_videoconference } = data;

          if (layout.active !== layout_videoconference) {
            onLayout({
              class: layout.class,
              active: layout_videoconference
            });
          }

          setStarPlayer(true);
        }
      }
    };

    getStartPlayer();
  }, [user]);
  if (starPlayer) {
    return (
      <div id="container_player">
        <ContainerPlayer />
      </div>
    );
  } else {
    return <p className="loading">Carregando</p>;
  }
};

const mapStateToProps = state => ({
  user: state.session.user.me,
  session: state.session.user.session,
  layout: state.Layout
});

const mapDispatchToProps = dispatch => {
  return {
    onLayout: number => {
      dispatch(layout(number));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
