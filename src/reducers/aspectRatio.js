const AllowAspectRatio = (state = false, action) => {
  switch (action.type) {
    case 'ASPECT_RATIO':
      return action.boolean;
    default:
      return state;
  }
};

export default AllowAspectRatio;
