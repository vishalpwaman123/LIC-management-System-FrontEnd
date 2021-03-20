import React, { useEffect, useState } from "react";
import "./resetPassword.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";

import userService from "../../services/userServices";
const User_service = new userService();

const validEmailRegex = RegExp(
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+.)+[^<>()[\].,;:\s@"]{2,})$/i
);

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function ResetPassword() {
  const [policiesState, setPoliciesState] = useState(false);
  const [detailStatus, setDetailStatus] = useState(true);
  const [buyPoliciesStatus, setBuyPoliciesStatus] = useState(false);
  const [password, setpassword] = useState(null);
  const [confirmpassword, setconfirmpassword] = useState(null);
  const [passworderror, setpassworderror] = useState();
  const [confirmpassworderror, setconfirmpassworderror] = useState();
  const [Success, setSuccess] = useState(false);
  const [snackbaropen, setsnackbaropen] = useState(false);
  const [customer_id, setcustomer_id] = useState();

  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    console.log(location.pathname); // result: '/secondpage'
    console.log(location.search); // result: '?query=abc'
    console.log(location.state.detail); // result: 'some_value'
    setcustomer_id(location.state.detail);
  }, [location]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name);
    console.log(value);
    let errorstatus = null;

    switch (name) {
      case "confirmpassword":
        errorstatus = value.length < 8 ? "confirm password Not valid" : "";
        setconfirmpassword(value);
        setconfirmpassworderror(errorstatus);
        break;
      case "password":
        errorstatus = value.length < 8 ? "Password Not valid" : "";
        setpassword(value);
        setpassworderror(errorstatus);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(password);
    console.log(confirmpassword);

    if (password === null) {
      setpassworderror("password Requred");
    }

    if (confirmpassword === null) {
      setconfirmpassworderror("confirm password Requred");
    }

    if (confirmpassword === null || password === null) {
      console.error("invalid Form");
    } else {
      if (confirmpassword == password) {
        const user = {
          customer_id: customer_id,
          password: password,
        };

        console.log("Calling Api");
        User_service.resetPassword(user)
          .then((data) => {
            if (data.status === 200) {
              console.log(data.data.data);
              let id = data.data.data;
              setsnackbaropen(true);
              setSuccess(true);
            }
          })
          .catch((error) => {
            console.log(error);
            setsnackbaropen(true);
            setSuccess(false);
          });
      } else {
        console.error("invalid Form");
        setsnackbaropen(true);
        setSuccess(false);
      }
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setsnackbaropen(false);
  };

  const handleLoginAgain = () => {
    history.push({
      pathname: "/login",
    });
  };

  return (
    <div className="loginMainContainer">
      <div className="loginContainer">
        <div className="loginfundoofont FT" align="center">
          LIFE INSURANCE CORPORATION
        </div>
        <p className="logintitle FT" align="center">
          Reset Password
        </p>
        <p className="loginSubTitle FT" align="center">
          Use your LIC Account
        </p>
        <div class="Input-Field">
          <div className="textField1">
            <TextField
              fullWidth
              autoComplete="off"
              className="InputField"
              type="password"
              name="password"
              label="password"
              id="outlined-size-small"
              variant="outlined"
              size="small"
              helperText="Use 8 or more characters with a mix of letters, numbers & symbols"
              required
              text-align="right"
              value={password}
              onChange={handleChange}
            />
            <div className="error">
              {passworderror == "Password Not valid" && (
                <span className="errorMessage">{passworderror}</span>
              )}
            </div>
          </div>
          <div className="textField2">
            <TextField
              fullWidth
              className="InputField"
              autoComplete="off"
              name="confirmpassword"
              label="confirmpassword"
              id="outlined-size-small"
              type="password"
              variant="outlined"
              size="small"
              helperText="Use 8 or more characters with a mix of letters, numbers & symbols"
              required
              value={confirmpassword}
              onChange={handleChange}
            />
            <div className="error">
              {confirmpassworderror == "confirm password Not valid" && (
                <span className="errorMessage">{confirmpassworderror}</span>
              )}
            </div>
          </div>
        </div>
        <div className="buttonContainer-forget">
          <div className="Lbutton2">
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              className="forget-btn"
            >
              Reset Password
            </Button>
          </div>
          <div className="Lbutton3">
            <Button
              variant="contained"
              color="primary"
              onClick={handleLoginAgain}
              className="login-btn"
            >
              Login Again
            </Button>
          </div>
        </div>
        <div className="AlertMessage">
          {snackbaropen ? (
            <Snackbar
              open={snackbaropen}
              autoHideDuration={6000}
              onClose={handleSnackbarClose}
            >
              {Success ? (
                <Alert onClose={handleSnackbarClose} severity="success">
                  Password Reset successful.
                </Alert>
              ) : (
                <Alert onClose={handleSnackbarClose} severity="error">
                  Password Reset Unsuccessful.
                </Alert>
              )}
            </Snackbar>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
