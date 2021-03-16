import React from "react";
import TextField from "@material-ui/core/TextField";
import logo from "../../Asserts/logoRegister.svg";
import "./Registration.css";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
// import userService from '../../Services/userServices';

// const User_service = new userService();

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

export default class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      confirmPassword: null,
      accountType: "Customer",

      errors: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      },

      flags: {
        status: "",
      },

      Responses: {
        Success: "",
        Message: "",
      },
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let flags = this.state.flags;
    let errors = this.state.errors;

    if (this.state.firstName == null) {
      errors.firstName = "First Name Required";
    }
    if (this.state.lastName == null) {
      errors.lastName = "Last Name Required";
    }
    if (this.state.email == null) {
      errors.email = "Email Id Required";
    }
    if (this.state.password == null) {
      errors.password = "Password Required";
    }
    if (this.state.confirmPassword == null) {
      errors.confirmPassword = "Confirm Password Required";
    }

    if (validateForm(this.state.errors)) {
      flags.status = "Success";
      console.info("Valid Form");

      if (
        this.state.firstName === null ||
        this.state.lastName === null ||
        this.state.email === null ||
        this.state.password === null ||
        this.state.confirmPassword === null
      ) {
        flags.status = "Failed";
        console.error("Invalid Form");
      } else {
        const user = {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
          password: this.state.password,
          service: "Advance",
        };

        if (this.state.password === this.state.confirmPassword) {
          console.log("Calling Api");
          // User_service.registration(user)
          // .then(data => {
          //     console.log("Login Data :", data);
          //     const object = data.data;
          //     console.log(object.success);
          //     console.log(object.message);
          //     /*Responses.Message = object.message;*/

          // })
          // .catch(error => {
          //     console.log(error);
          // })
        }
      }
    } else {
      flags.status = "Failed";
      console.error("Invalid Form");
    }

    this.setState({ flags }, () => console.log(this.state));
  };

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case "firstName":
        errors.firstName = value.length <= 3 ? "First Name is not valid" : "";
        break;
      case "lastName":
        errors.lastName = value.length <= 3 ? "Last Name is not valid" : "";
        break;
      case "email":
        errors.email = validEmailRegex.test(value) ? "" : "Email Id not valid";
        break;
      case "password":
        errors.password = value.length < 8 ? "Password Not valid" : "";
        break;
      case "confirmPassword":
        errors.confirmPassword =
          value.length < 8 ? "Confirm password not valid" : "";
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
    const { Responses } = this.state;
    return (
      <div className="mainContainer">
        <div className="bodyContainer">
          <div className="registrationContainer">
            <div className="fundoofont Font-style">
              <span class="">L</span>
              <span class="">I</span>
              <span class="">F</span>
              <span class="">E</span>
              &nbsp;
              <span class="">I</span>
              <span class="">N</span>
              <span class="">S</span>
              <span class="">U</span>
              <span class="">R</span>
              <span class="">A</span>
              <span class="">N</span>
              <span class="">C</span>
              <span class="">E</span>
              &nbsp;
              <span class="">C</span>
              <span class="">O</span>
              <span class="">R</span>
              <span class="">P</span>
              <span class="">O</span>
              <span class="">R</span>
              <span class="">A</span>
              <span class="">T</span>
              <span class="">I</span>
              <span class="">O</span>
              <span class="">N</span>
            </div>
            <form className="textFieldBody" onSubmit={this.handleSubmit}>
              <div className="p1">Create your Account</div>
              <div className="All-Input">
                <div className="text">
                  <div className="textColumn1">
                    <TextField
                      autoComplete="off"
                      fullWidth
                      type="email"
                      name="email"
                      label="Username"
                      InputLabelProps={{ style: { fontSize: 15 } }}
                      id="outlined-size-small"
                      variant="outlined"
                      size="small"
                      helperText="Use EmailID or Mobile Number"
                      required
                      placeholder="@gmail.com"
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
                  <div className="textColumn2">
                    <div className="textRow1">
                      <TextField
                        label="Password"
                        InputLabelProps={{ style: { fontSize: 15 } }}
                        name="password"
                        type="password"
                        id="outlined-size-small"
                        variant="outlined"
                        size="small"
                        value={this.state.password}
                        onChange={this.handleChange}
                        required
                      />
                      <div className="error">
                        {errors.password.length > 0 && (
                          <span className="errorMessage">
                            {errors.password}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="textRow2">
                      <TextField
                        label="Confirm Password"
                        InputLabelProps={{ style: { fontSize: 15 } }}
                        type="password"
                        name="confirmPassword"
                        id="outlined-size-small"
                        variant="outlined"
                        size="small"
                        value={this.state.confirmPassword}
                        onChange={this.handleChange}
                        required
                      />
                      <div className="error">
                        {errors.confirmPassword.length > 0 && (
                          <span className="errorMessage">
                            {errors.confirmPassword}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <p className="passwordHint">
                    Use 8 or more characters with a mix of letters, numbers &
                    symbols
                  </p>
                </div>
                <div className="radiobutton">
                  <RadioGroup
                    aria-label="gender"
                    className="radiobutton1"
                    value={this.state.accountType}
                    onChange={this.accountTypeHandle}
                  >
                    <FormControlLabel
                      value="Management"
                      control={<Radio />}
                      label="Management"
                    />
                    <FormControlLabel
                      value="Customer"
                      control={<Radio />}
                      label="Customer"
                    />
                  </RadioGroup>
                </div>
                <div className="button">
                  <div className="button1">
                    <Button variant="link" href="/login">
                      Sign in instead
                    </Button>
                  </div>
                  <div className="button2">
                    <Button variant="primary" onClick={this.handleSubmit}>
                      Register
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="sideImageBox">
            <div className="figureBox">
              <div className="image">
                <img src={logo} class="tempimage" alt="Temperature" />
                <figcaption className="figCaption">
                  One account. All Our Management working for you.
                </figcaption>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="AlertMessage">
                    <div className="successAlert">
                        {flags.status === "Success" && (
                            <Alert severity="success">
                                <AlertTitle>{Responses.Success}</AlertTitle>
                                <strong></strong>
                            </Alert>
                        )}
                    </div>
                    <div className="failedAlert">
                        {flags.status === "Failed" && (
                            <Alert severity="error">
                                <AlertTitle>Error</AlertTitle>
                                <strong></strong>
                            </Alert>
                        )}
                    </div>
                </div> */}
      </div>
    );
  }
}
