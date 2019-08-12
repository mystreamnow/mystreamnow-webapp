import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#57a9b3',
      contrastText: '#fff'
    },
    secondary: {
      main: 'rgb(220, 0, 78)',
      contrastText: '#fff'
    }
  },
  typography: {
    useNextVariants: true
  }
});

export default theme;
