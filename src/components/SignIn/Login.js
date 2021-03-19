import React from "react";
import "./login.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
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

export default class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      accountType: "Customer",
      Alertstatus: null,
      Success: null,
      snackbaropen: false,

      errors: {
        email: "",
        password: "",
      },
    };
  }

  forgetPasswordRedirect = () => {
    this.props.history.push({
      pathname: "/forgetpassword",
    });
  };

  handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ snackbaropen: false });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let flags = this.state.flags;
    let errors = this.state.errors;

    if (this.state.email === null) {
      errors.email = "Email Id Requred";
    }

    if (this.state.password === null) {
      errors.password = "Password Requred";
    }

    if (validateForm(this.state.errors)) {
      console.info("Valid Form");

      if (this.state.email === null || this.state.password === null) {
        console.error("invalid Form");
      } else {
        const user = {
          email: this.state.email,
          password: this.state.password,
          account_Type: this.state.accountType,
        };

        console.log("Calling Api");
        User_service.login(user)
          .then((data) => {
            if (data.status === 200) {
              console.log(data.data.data[0].customer_id);
              let id = data.data.data[0].customer_id;
              this.setState({ snackbaropen: true });
              this.setState({ Success: true });
              if (user.account_Type == "Customer") {

                this.props.history.push({
                  pathname: "/userDashboaed",
                  search: "?query=id",
                  state: { detail: id },
                });
                
              } else if (user.account_Type == "Agent") {
                this.props.history.push({
                  pathname: "/AgentDashboaed",
                  search: "?query=id",
                  state: { detail: id },
                });

                // this.props.history.push("/AgentDashboaed");
              } else if (user.account_Type == "Manager") {
                this.props.history.push({
                  pathname: "/BranchManagerboard",
                  search: "?query=id",
                  state: { detail: id },
                });

                // this.props.history.push("/BranchManagerboard");
              } else {
                this.props.history.push({
                  pathname: "/CEODashboaed",
                  search: "?query=id",
                  state: { detail: id },
                });
              }
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
      case "password":
        errors.password = value.length < 8 ? "Password Not valid" : "";
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value }, () => console.log(this.state));
  };

  accountTypeHandle = (event) => {
    event.preventDefault();
    const { value } = event.target;
    let accountType = this.state.accountType;
    console.log(value);
    this.setState({ accountType: value }, () =>
      console.log(this.state.accountType)
    );
  };

  render() {
    const { errors } = this.state;
    const { flags } = this.state;
    return (
      <div className="loginMainContainer">
        <div className="loginContainer">
          <div className="loginfundoofont FT" align="center">
            LIFE INSURANCE CORPORATION
          </div>
          <p className="logintitle FT" align="center">
            Sign in
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
                label="Username"
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
            <div className="textField2">
              <TextField
                fullWidth
                className="InputField"
                name="password"
                label="Password"
                id="outlined-size-small"
                variant="outlined"
                size="small"
                helperText="Use 8 or more characters with a mix of letters, numbers & symbols"
                required
                value={this.state.password}
                onChange={this.handleChange}
              />
              <div className="error">
                {errors.password.length > 0 && (
                  <span className="errorMessage">{errors.password}</span>
                )}
              </div>
            </div>
          </div>
          <div className="radiobutton">
            <RadioGroup
              aria-label="categoty"
              className="radiobutton1"
              value={this.state.accountType}
              onChange={this.accountTypeHandle}
            >
              <FormControlLabel
                value="CEO"
                control={<Radio />}
                label="CEO"
                className="ceo-Radio-Button"
              />
              <FormControlLabel
                value="Manager"
                control={<Radio />}
                label="Manager"
                className="manager-Radio-Button"
              />
              <FormControlLabel
                value="Agent"
                control={<Radio />}
                label="Agent"
                className="agent-Radio-Button"
              />
              <FormControlLabel
                value="Customer"
                control={<Radio />}
                label="Customer"
                className="customer-Radio-Button"
              />
            </RadioGroup>
          </div>
          <div className="Lbutton3">
            <Button
              color="primary"
              href="/forgetPassword"
              className="Forgetpassword"
            >
              Forget password?
            </Button>
          </div>
          <div className="buttonContainer">
            <div className="Lbutton1">
              <Button color="primary" href="/" class="CreateAccount">
                Create account
              </Button>
            </div>

            <div className="Lbutton2">
              <Button
                variant="contained"
                color="primary"
                onClick={this.forgetPasswordRedirect}
                className="SignIn-btn"
              >
                Sign in
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
