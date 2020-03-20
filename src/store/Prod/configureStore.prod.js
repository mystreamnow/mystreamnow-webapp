import { createStore, applyMiddleware } from "redux";
import { sessionService } from "redux-react-session";
import createSagaMiddleware from "redux-saga";
import thunk from "redux-thunk";
import { initialize, addTranslation } from "react-localize-redux";
import { setPusherClient } from "react-pusher";
import Pusher from "pusher-js";
import { getEnv } from "./../../helper/helper";
import rootReducer from "./../../reducers";
import global from "./../../lang/global.json";
import rootSaga from "./../saga";

/* LANGUAGES SITE */
const LANGUAGES = [
  { name: "PT", code: "pt-BR" },
  { name: "EN", code: "en-US" },
  { name: "ES", code: "es" }
];

const sagaMiddleware = createSagaMiddleware();

const configureStore = preloadedState => {
  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk, sagaMiddleware)
  );

  const userLang = LANGUAGES.filter(lang => lang.code === navigator.language);
  let defaultLang = userLang.length > 0 ? userLang[0].code : LANGUAGES[0].code;

  // Dispatchs
  store.dispatch(
    initialize(LANGUAGES, {
      defaultLanguage: defaultLang
    })
  );
  store.dispatch(addTranslation(global));

  // Session
  const validateSession = () => {
    return true;
  };

  const options = {
    refreshOnCheckAuth: true,
    redirectPath: "/player",
    driver: "COOKIES",
    validateSession
  };

  sessionService.initSessionService(store, options);

  // Pusher
  const pusherClient = new Pusher(getEnv("API_PUSHER_KEY"), {
    cluster: "us2"
  });

  setPusherClient(pusherClient);

  sagaMiddleware.run(rootSaga);

  return store;
};

export default configureStore;
