import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Player from '../Player';
import Login from '../Login';
import PrivateRoute from './PrivateRoute';
// import Page404 from '../Player/Page404';

const App = ({ authenticated, checked, history }) => {
  return (
    <Fragment>
      {checked &&
        <Switch>
          <PrivateRoute
            exact
            path={'/player'}
            authenticated={authenticated}
            component={() => {
              return <Player />;
            }}
          />
          <Route
            exact
            path={'/:idroom?/:email?'}
            component={({ match }) => {
              return (
                <Login
                  history={history}
                  authenticated={authenticated}
                  match={match}
                />
              );
            }}
          />
        </Switch>}
    </Fragment>
  );
};

const { bool } = PropTypes;

App.propTypes = {
  authenticated: bool.isRequired,
  checked: bool.isRequired
};

const mapState = ({ session }) => ({
  checked: session.checked,
  authenticated: session.authenticated
});

export default connect(mapState)(withRouter(App));
