import React, { useEffect } from 'react';
import {
  Grid,
  CardActionArea,
  Card,
  CardMedia,
  CardContent
} from '@material-ui/core';
import { connect } from 'react-redux';

import Checked from '../../../../HelperComponents/Checked/Checked';

import { layoutBroadcast } from './../../../../../../actions/Player';

const ContainerLayout = ({ screenshare, layoutbroadcast, onLayout }) => {
  useEffect(
    () => {
      console.log(layoutbroadcast);
    },
    [layoutbroadcast]
  );

  function handleLayout (layout) {
    onLayout({
      active: layoutbroadcast.active !== layout ? layout : ''
    });
  }

  const { active } = layoutbroadcast;

  return (
    <div id='containerLayout'>
      <Grid container justify='center' alignItems='center'>
        {screenshare === false &&
          <Grid item xs={10} sm={5} lg={4} xl={4}>
            <Card
              onClick={() => handleLayout('bestFit')}
              className={`card ${active === 'bestFit' ? 'active' : ''}`}
            >
              <CardActionArea>
                {active === 'bestFit'
                  ? <Checked checked={active === 'bestFit'}>
                    <CardMedia
                      className='media'
                      image='/img/bestfit.png'
                      title='My Stream Now - Streaming Bestfit'
                      />
                  </Checked>
                  : <CardMedia
                    className='media'
                    image='/img/bestfit.png'
                    title='My Stream Now - Streaming Bestfit'
                    />}

                <CardContent className='txt_media'>
                  Melhor disposição de câmeras
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>}
        {screenshare &&
          <Grid item xs={10} sm={5} lg={4} xl={4}>
            <Card
              onClick={() => handleLayout('verticalPresentation')}
              className={`card ${active === 'verticalPresentation'
                ? 'active'
                : ''}`}
            >
              <CardActionArea>
                {active === 'verticalPresentation'
                  ? <Checked checked={active === 'verticalPresentation'}>
                    <CardMedia
                      className='media'
                      image='/img/verticalPresentation.png'
                      title='My Stream Now - Vertical Presentation'
                      />
                  </Checked>
                  : <CardMedia
                    className='media'
                    image='/img/verticalPresentation.png'
                    title='My Stream Now - Vertical Presentation'
                    />}

                <CardContent className='txt_media'>
                  Layout com apresentação vertical
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>}
        {screenshare &&
          <Grid item xs={10} sm={5} lg={4} xl={4}>
            <Card
              onClick={() => handleLayout('horizontalPresentation')}
              className={`card ${active === 'horizontalPresentation'
                ? 'active'
                : ''}`}
            >
              <CardActionArea>
                {active === 'horizontalPresentation'
                  ? <Checked checked={active === 'horizontalPresentation'}>
                    <CardMedia
                      className='media'
                      image='/img/horizontalPresentation.png'
                      title='My Stream Now - Horizontal Presentation'
                      />
                  </Checked>
                  : <CardMedia
                    className='media'
                    image='/img/horizontalPresentation.png'
                    title='My Stream Now - Horizontal Presentation'
                    />}

                <CardContent className='txt_media'>
                  Layout com apresentação horizontal
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>}
      </Grid>
    </div>
  );
};

const mapState = state => {
  return {
    screenshare: state.ScreenShare,
    layoutbroadcast: state.layoutbroadcast
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLayout: number => {
      dispatch(layoutBroadcast(number));
    }
  };
};

export default connect(mapState, mapDispatchToProps)(ContainerLayout);
