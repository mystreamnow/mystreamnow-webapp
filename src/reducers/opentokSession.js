const OpentokSession = (state = {}, action) => {
  switch (action.type) {
    case 'OPENTOKSESSION':
      return action.object;
    default:
      return state;
  }
};

export default OpentokSession;
