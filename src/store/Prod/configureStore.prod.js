import { createStore, applyMiddleware } from 'redux';
import { sessionService } from 'redux-react-session';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { initialize, addTranslation } from 'react-localize-redux';
import { setPusherClient } from 'react-pusher';
import Pusher from 'pusher-js';
import { getEnv } from './../../helper/helper';
import api from './../../middleware/api';
import rootReducer from './../../reducers';
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
    applyMiddleware(thunk, api, sagaMiddleware)
  );

  // Dispatchs
  store.dispatch(
    initialize(LANGUAGES, {
      defaultLanguage: navigator.language || navigator.userLanguage
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

  sessionService.initSessionService(store, options);

  // Pusher
  const pusherClient = new Pusher(getEnv('API_PUSHER_KEY'), {
    cluster: 'us2'
  });

  setPusherClient(pusherClient);

  sagaMiddleware.run(rootSaga);

  return store;
};

export default configureStore;
