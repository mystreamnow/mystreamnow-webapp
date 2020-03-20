/* eslint no-restricted-globals: 0 */

import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

import CopyRight from "./_includes/CopyRight";
import useStyles from "./assets/assets/style";
import Logo from "./assets/imgs/logo.png";
import * as PlayerActions from "../../actions";
import CheckAuth from "./_includes/CheckAuth";

const Login = ({
  match,
  requestSession,
  history,
  authenticated,
  user,
  session
}) => {
  const classes = useStyles();

  const { idroom = "", email = "" } = match.params;
  let guest;
  let type = 1;

  if (idroom !== "" && email === "") {
    guest = true;
    type = 2;
  } else {
    guest = false;
    type = 1;
  }

  const [inputs, setInputs] = useState({
    emailInput: email,
    roomInput: idroom,
    type: type
  });

  const handleSubmit = event => {
    if (event) {
      event.preventDefault();
      Object.assign(inputs, { history: history });
      requestSession(inputs);
    }
  };

  const handleInputChange = () => {
    if (event.target.name === "roomInput") {
      if (event.target.value.length <= 9) {
        setInputs(inputs => ({
          ...inputs,
          [event.target.name]: event.target.value
        }));
      }
    } else {
      setInputs(inputs => ({
        ...inputs,
        [event.target.name]: event.target.value
      }));
    }
  };

  let checkAuthUser = (user, session, authenticated, history) => {
    if (user && authenticated) {
      return (
        <CheckAuth
          name={user.name}
          gender={user.gender}
          meetingTitle={session.meeting_title}
          openModal={authenticated}
          history={history}
        />
      );
    }
  };

  return (
    <Fragment>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <img src={Logo} alt="My Stream Now" />
            <form className={classes.form} onSubmit={handleSubmit} noValidate>
              {guest ? (
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  type="text"
                  id="nameInput"
                  label="Digite seu nome"
                  autoComplete="nameInput"
                  name="nameInput"
                  onChange={handleInputChange}
                  value={inputs.name}
                  autoFocus
                />
              ) : (
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  type="email"
                  id="emailInput"
                  label="Digite seu email"
                  autoComplete="emailInput"
                  name="emailInput"
                  onChange={handleInputChange}
                  value={inputs.emailInput}
                  autoFocus
                />
              )}

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                type="number"
                id="roomInput"
                label="Id da reunião"
                autoComplete="roomInput"
                name="roomInput"
                onChange={handleInputChange}
                value={inputs.roomInput}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="lembre-me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Entrar
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Perdeu sua senha?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="https://mystreamnow.com/" variant="body2">
                    {"Você não possui uma conta? Crie agora"}
                  </Link>
                </Grid>
              </Grid>
              <Box mt={5}>
                <CopyRight />
              </Box>
            </form>
          </div>
        </Grid>
        {user && checkAuthUser(user, session, authenticated)}
      </Grid>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  user: state.session.user.me,
  session: state.session.user.session
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(PlayerActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
