const LayoutBroadcast = (
  state = {
    active: ''
  },
  action
) => {
  switch (action.type) {
    case 'LAYOUT_BROADCAST':
      return action.object;
    default:
      return state;
  }
};

export default LayoutBroadcast;
