import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';

import App from './../../components/App';
import theme from './../../assets/Theme';

const Root = ({ store }) =>
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MuiThemeProvider>
  </Provider>;

Root.propTypes = {
  store: PropTypes.object.isRequired
};

export default Root;
