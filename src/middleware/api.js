import { normalize, schema } from 'normalizr';
import { camelizeKeys } from 'humps';
import { sessionService } from 'redux-react-session';
import { graphCall } from './../helper/graphCall';
import { getApiUrl } from './../helper/helper';

const API_ROOT = getApiUrl();

const storeSessionPlayer = session => {
  sessionService
    .saveSession({ session })
    .then(() => {
      sessionService
        .saveUser({
          me: session.user[0],
          session: session,
        })
        .then(() => {});
    })
    .catch(err => console.error(err));
};

const callApi = (endpoint, schema, data) => {
  const fullUrl =
    endpoint.indexOf(API_ROOT) === -1 ? API_ROOT + endpoint : endpoint;

  if (schema._key == 'trigger') {
    return fetch(fullUrl, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    }).then(response =>
      response.json().then(json => {
        const data = camelizeKeys(json);

        return Object.assign({}, normalize(data, schema));
      }),
    );
  } else {
    const dataLogin = {
      code: data.code,
      image: data.image,
      senha: data.password,
      email: data.username,
    };

    const dataValidate = {
      code: data.code,
      password: data.password,
    };

    return graphCall('eventValidate', dataValidate)
      .then(result => {
        if (result.data.eventvalidate === 1) {
          return graphCall('login', dataLogin).then(response => {
            if (response.hasOwnProperty('errors')) {
              let url = `/completar/${data.code}/${data.password}/${
                data.username
              }`;
              window.location = url;
            } else if (response.data.login === null) {
              let error = { code: data.code, error: 4 };
              return Object.assign({}, normalize(error, schema));
            } else {
              const { login } = response.data;
              let session = camelizeKeys(login);

              storeSessionPlayer(session, false);
              return Object.assign({}, normalize(session, schema));
            }
          });
        } else {
          let error = { code: data.code, error: result.data.eventvalidate };
          return Object.assign({}, normalize(error, schema));
        }
      })
      .catch(error => console.error(`Event Validate Error ${error}`));
  }
};

const userSchema = new schema.Entity(
  'user',
  {},
  {
    idAttribute: user => user.code,
  },
);

const triggerPusher = new schema.Entity(
  'trigger',
  {},
  {
    idAttribute: trigger => trigger.code,
  },
);

export const Schemas = {
  USER: userSchema,
  USER_ARRAY: [userSchema],
  TRIGGER: triggerPusher,
};

export const CALL_API = 'Call API';

export default store => next => action => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === 'undefined') {
    return next(action);
  }
  let { endpoint, data } = callAPI;
  const { schema, types } = callAPI;

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState());
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }
  if (!schema) {
    throw new Error('Specify one of the exported Schemas.');
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }

  const actionWith = data => {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  };

  const [requestType, successType, failureType] = types;
  next(actionWith({ type: requestType }));

  return callApi(endpoint, schema, data).then(
    response =>
      next(
        actionWith({
          response,
          type: successType,
        }),
      ),
    error =>
      next(
        actionWith({
          type: failureType,
          error: error.message || 'Something bad happened',
        }),
      ),
  );
};
