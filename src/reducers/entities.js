import merge from 'lodash/merge';

export const entities = (state = { trigger: {} }, action) => {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities);
  }

  return state;
};
