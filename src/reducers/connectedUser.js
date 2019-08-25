const ConnectedUser = (state = false, action) => {
  switch (action.type) {
    case 'CONNECTED_SESSION':
      return action.boolean;
    default:
      return state;
  }
};

export default ConnectedUser;
