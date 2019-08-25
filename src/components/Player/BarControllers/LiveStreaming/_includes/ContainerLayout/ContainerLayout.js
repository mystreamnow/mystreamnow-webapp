import React from 'react';
import {
  Grid,
  CardActionArea,
  Card,
  CardMedia,
  CardContent
} from '@material-ui/core';
import { connect } from 'react-redux';

import Checked from '../../../../HelperComponents/Checked/Checked';

const ContainerLayout = ({ screenshare }) => {
  const [layoutChecked, setLayout] = React.useState({
    bestfit: false,
    vertical: false,
    horizontal: false
  });

  function handleLayoutBestfit () {
    setLayout({
      bestfit: !layoutChecked.bestfit
    });

    setTimeout(function () {
      setLayout({
        bestfit: true,
        loadingChecked: true
      });
    }, 1000);
  }

  function handleLayoutVertical () {
    setLayout({
      vertical: !layoutChecked.vertical
    });

    setTimeout(function () {
      setLayout({
        vertical: true,
        loadingChecked: true
      });
    }, 1000);
  }

  function handleLayoutHorizontal () {
    setLayout({
      horizontal: !layoutChecked.horizontal
    });

    setTimeout(function () {
      setLayout({
        horizontal: true,
        loadingChecked: true
      });
    }, 1000);
  }

  return (
    <div id='containerLayout'>
      <Grid container justify='center' alignItems='center'>
        {screenshare === false &&
          <Grid item xs={10} sm={5} lg={4} xl={4}>
            <Card
              onClick={handleLayoutBestfit}
              className={`card ${layoutChecked.bestfit ? 'active' : ''}`}
            >
              <CardActionArea>
                {layoutChecked.bestfit
                  ? <Checked checked={layoutChecked.loadingChecked}>
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
              onClick={handleLayoutVertical}
              className={`card ${layoutChecked.vertical ? 'active' : ''}`}
            >
              <CardActionArea>
                {layoutChecked.vertical
                  ? <Checked checked={layoutChecked.loadingChecked}>
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
              onClick={handleLayoutHorizontal}
              className={`card ${layoutChecked.horizontal ? 'active' : ''}`}
            >
              <CardActionArea>
                {layoutChecked.horizontal
                  ? <Checked checked={layoutChecked.loadingChecked}>
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
    screenshare: state.ScreenShare
  };
};

export default connect(mapState)(ContainerLayout);
