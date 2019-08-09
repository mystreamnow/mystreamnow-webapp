const AllowCam = (state = true, action) => {
  switch (action.type) {
    case 'ALLOW_CAM':
      return action.boolean;
    default:
      return state;
  }
};

export default AllowCam;
