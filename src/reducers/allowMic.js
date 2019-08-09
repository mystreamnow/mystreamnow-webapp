const AllowMic = (state = true, action) => {
  switch (action.type) {
    case 'ALLOW_MIC':
      return action.boolean;
    default:
      return state;
  }
};

export default AllowMic;
