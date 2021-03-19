import React from "react";
import "./forgetPassword.scss";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

import userService from "../../services/userServices";
const User_service = new userService();

const validEmailRegex = RegExp(
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+.)+[^<>()[\].,;:\s@"]{2,})$/i
);

const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach((val) => {
    val.length > 0 && (valid = false);
  });
  return valid;
};

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default class ForgetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      Success: null,
      snackbaropen: false,

      errors: {
        email: "",
      },
    };
  }

  // resetPasswordRedirect = () => {
  //   this.props.history.push({
  //     pathname: "/resetpassword",
  //   });
  // };

  handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ snackbaropen: false });
  };

  resetPasswordRedirect = (event) => {
    event.preventDefault();
    let errors = this.state.errors;

    if (this.state.email === null) {
      errors.email = "Email Id Required";
    }

    if (validateForm(this.state.errors)) {
      console.info("Valid Form");

      if (this.state.email === null) {
        console.error("invalid Form");
      } else {
        const user = {
          email: this.state.email,
        };

        console.log("Calling Api");
        User_service.forgetPassword(user)
          .then((data) => {
            if (data.status === 200) {
              console.log(data.data.data[0]);
              var id = data.data.data[0].customer_id;
              this.setState({ snackbaropen: true });
              this.setState({ Success: true });

              this.props.history.push({
                pathname: "/resetpassword",
                search: "?query=id",
                state: { detail: id },
              });
            }
          })
          .catch((error) => {
            this.setState({ snackbaropen: true });
            this.setState({ Success: false });
            console.log(error);
          });
      }
    } else {
      console.error("Invalid Form");
    }
  };

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case "email":
        errors.email = validEmailRegex.test(value) ? "" : "Email Id not valid";
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value }, () => console.log(this.state));
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="forgetMainContainer">
        <div className="loginContainer">
          <div className="loginfundoofont FT" align="center">
            LIFE INSURANCE CORPORATION
          </div>
          <p className="logintitle FT" align="center">
            Forget Password
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
                type="email"
                name="email"
                label="Email Id"
                id="outlined-size-small"
                variant="outlined"
                size="small"
                helperText="Use EmailID"
                required
                text-align="right"
                value={this.state.email}
                onChange={this.handleChange}
              />
              <div className="error">
                {errors.email.length > 0 && (
                  <span className="errorMessage">{errors.email}</span>
                )}
              </div>
            </div>
          </div>
          <div className="buttonContainer">
            <div className="Lbutton2">
              <Button
                variant="contained"
                color="primary"
                onClick={this.resetPasswordRedirect}
                className="SignIn-btn"
              >
                Reset Password
              </Button>
            </div>
          </div>
          <div className="AlertMessage">
            {this.state.snackbaropen ? (
              <Snackbar
                open={this.state.snackbaropen}
                autoHideDuration={6000}
                onClose={this.handleSnackbarClose}
              >
                {this.state.Success ? (
                  <Alert onClose={this.handleSnackbarClose} severity="success">
                    Registration successful.
                  </Alert>
                ) : (
                  <Alert onClose={this.handleSnackbarClose} severity="error">
                    Registration Unsuccessful.
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
}
