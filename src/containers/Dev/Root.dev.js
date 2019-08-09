import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import DevTools from './DevTools';
import { BrowserRouter } from 'react-router-dom';
import App from './../../components/App';

const Root = ({ store }) =>
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <DevTools />
    </BrowserRouter>
  </Provider>;

Root.propTypes = {
  store: PropTypes.object.isRequired
};
export default Root;
