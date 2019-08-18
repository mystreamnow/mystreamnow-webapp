const Layout = (
  state = {
    class: ['default', 'cameraWithPresentation'],
    active: 'default'
  },
  action
) => {
  switch (action.type) {
    case 'LAYOUT':
      return action.object;
    default:
      return state;
  }
};

export default Layout;
