import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Typography from "@material-ui/core/Typography";

import useStyles from "./../../assets/assets/style";

import { logout } from "./../../../../actions/Player";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function CheckAuth({
  openModal,
  name,
  gender,
  meetingTitle,
  history,
  onLogout
}) {
  useEffect(() => {
    setOpen(openModal);
  }, [openModal]);

  const [open, setOpen] = React.useState(false);

  let handleClose = () => {
    history.push("/player");
    setOpen(false);
  };

  let handleLogout = () => {
    onLogout();
    setOpen(false);
  };

  let textUser = (name, gender) => {
    if (gender === "M") {
      return (
        <Fragment>
          Olá senhor <strong>{name}</strong>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          Olá senhora <strong>{name}</strong>
        </Fragment>
      );
    }
  };

  const classes = useStyles();

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="customized-dialog-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="customized-dialog-title">
          Verificamos que você já encontra-se na reunião: {meetingTitle}
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText id="alert-dialog-slide-description">
            <Typography
              className={classes.checkAuth}
              component={"span"}
              variant={"subtitle1"}
            >
              {textUser(name, gender)} você ainda encontra-se logado na reunião
              caso queira continuar, por favor, clique em continuar.
            </Typography>
            <br />
            <br />
            <Typography
              className={classes.checkAuth}
              component={"span"}
              variant={"subtitle1"}
            >
              Agora caso queira sair da reunião: <strong>{meetingTitle}</strong>{" "}
              clique no botão sair.
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleClose}>
            Continuar
          </Button>
          <Button
            color="secondary"
            onClick={() => {
              handleLogout();
            }}
          >
            Sair
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => {
  return {
    onLogout: history => {
      dispatch(logout(history));
    }
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CheckAuth)
);
