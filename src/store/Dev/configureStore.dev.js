import { createStore, applyMiddleware, compose } from 'redux';
import { sessionService } from 'redux-react-session';
import createSagaMiddleware from 'redux-saga';
import { initialize, addTranslation } from 'react-localize-redux';
import { setPusherClient } from 'react-pusher';
import Pusher from 'pusher-js';
import thunk from 'redux-thunk';
import { getEnv } from './../../helper/helper';
import rootReducer from './../../reducers';
import DevTools from './../../containers/Dev/DevTools';
import global from './../../lang/global.json';

/* LANGUAGES SITE */
const LANGUAGES = [
  { name: 'PT', code: 'pt-BR' },
  { name: 'EN', code: 'en-US' },
  { name: 'ES', code: 'es' }
];

import rootSaga from './../saga';

const sagaMiddleware = createSagaMiddleware();

const configureStore = preloadedState => {
  const store = createStore(
    rootReducer,
    preloadedState,
    compose(applyMiddleware(thunk, sagaMiddleware), DevTools.instrument())
  );

  // Dispatchs
  store.dispatch(
    initialize(LANGUAGES, {
      defaultLanguage: 'pt-BR'
    })
  );
  store.dispatch(addTranslation(global));

  // Session
  const validateSession = () => {
    return true;
  };

  const options = {
    refreshOnCheckAuth: true,
    redirectPath: '/player',
    driver: 'COOKIES',
    validateSession
  };
  sessionService
    .initSessionService(store, options)
    .then(() =>
      console.log(
        'Redux React Session is ready and a session was refreshed from your storage'
      )
    )
    .catch(() =>
      console.log(
        'Redux React Session is ready and there is no session in your storage'
      )
    );

  // Pusher
  const pusherClient = new Pusher(getEnv('API_PUSHER_KEY'), {
    cluster: 'us2'
  });

  setPusherClient(pusherClient);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./../../reducers', () => {
      store.replaceReducer(rootReducer);
    });
  }

  sagaMiddleware.run(rootSaga);

  return store;
};

export default configureStore;
