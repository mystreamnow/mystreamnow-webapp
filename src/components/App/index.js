import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Player from '../Player';
import Login from '../Login';
// import Page404 from '../Player/Page404';

const App = () => {
  return (
    <Fragment>
      <Switch>
        <Route
          exact
          path={'/player'}
          component={() => {
            return <Player />;
          }}
        />
        <Route
          exact
          path={'/:email?/:idroom?'}
          component={({ match }) => {
            return <Login match={match} />;
          }}
        />
      </Switch>
    </Fragment>
  );
};

export default App;
