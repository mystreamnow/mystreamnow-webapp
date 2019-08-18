export const ScreenShare = (state = false, action) => {
  switch (action.type) {
    case 'SCREEN_SHARE':
      return action.boolean;
    default:
      return state;
  }
};

export const BtnScreenShare = (state = true, action) => {
  switch (action.type) {
    case 'BTN_SCREEN_SHARE':
      return action.boolean;
    default:
      return state;
  }
};
