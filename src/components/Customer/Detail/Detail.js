import React, { Component } from "react";
import "./Detail.css";

import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import TextField from "@material-ui/core/TextField";
import Button from "react-bootstrap/Button";

const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach((val) => {
    val.length > 0 && (valid = false);
  });
  return valid;
};

export class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: null,
      Age: null,
      Qualification: null,
      Address: null,
      Occupation: null,
      genderType: "male",

      errors: {
        userName: "",
        Age: "",
        Qualification: "",
        Address: "",
        Occupation: "",
      },
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // let flags = this.state.flags;
    let errors = this.state.errors;

    if (this.state.userName == null) {
      errors.userName = "user Name Required";
    }
    if (this.state.Age == null) {
      errors.Age = "Age Required";
    }
    if (this.state.Qualification == null) {
      errors.Qualification = "Qualification Required";
    }
    if (this.state.Address == null) {
      errors.Address = "Address Required";
    }
    if (this.state.Occupation == null) {
      errors.Occupation = "Occupation Required";
    }

    if (validateForm(this.state.errors)) {
      //   flags.status = "Success";
      console.info("Valid Form");

      if (
        this.state.userName === null ||
        this.state.Age === null ||
        this.state.Qualification === null ||
        this.state.Address === null ||
        this.state.Occupation === null
      ) {
        // flags.status = "Failed";
        console.error("Invalid Form");
      } else {
        const user = {
          userName: this.state.userName,
          Age: this.state.Age,
          Qualification: this.state.Qualification,
          Address: this.state.Address,
          Occupation: this.state.Occupation,
        };
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
    } else {
      //   flags.status = "Failed";
      console.error("Invalid Form");
    }
  };

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case "userName":
        errors.userName = value.length <= 3 ? "user Name is not valid" : "";
        break;
      case "Age":
        errors.Age = value.length <= 3 ? "Age is not valid" : "";
        break;
      case "Qualification":
        errors.Qualification =
          value.length > 3 ? "" : "Qualification not valid";
        break;
      case "Address":
        errors.Address = value.length < 3 ? "Address Not valid" : "";
        break;
      case "Occupation":
        errors.Occupation = value.length < 3 ? "Occupation not valid" : "";
        break;

      default:
        break;
    }

    this.setState({ errors, [name]: value }, () => console.log(this.state));
  };

  genderTypeHandle = (event) => {
    event.preventDefault();
    const { value } = event.target;
    let genderType = this.state.genderType;
    console.log(value);
    this.setState({ genderType: value }, () =>
      console.log(this.state.accountType)
    );
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="user-detail-container">
        <div className="sub_Container">
          <div className="header">
            <div className="lic-Header">LIFE INSURENCE CORPORATION</div>
            <div className="user-Header">User Detail</div>
          </div>
          <div className="user-Information">
            <div className="user-Name">
              <div className="user-Name-Text">Name :</div>
              <div className="user-Name-Input">
                <TextField
                  label="userName"
                  InputLabelProps={{ style: { fontSize: 15 } }}
                  type="text"
                  name="userName"
                  id="outlined-size-small"
                  variant="outlined"
                  size="small"
                  value={this.state.userName}
                  onChange={this.handleChange}
                  required
                />
                <div className="error">
                  {errors.userName.length > 0 && (
                    <span className="errorMessage">{errors.userName}</span>
                  )}
                </div>
              </div>
            </div>
            <div className="user-Age">
              <div className="user-Age-Text">Age :</div>
              <div className="user-Age-Input">
                <TextField
                  label="Age"
                  InputLabelProps={{ style: { fontSize: 15 } }}
                  type="number"
                  name="Age"
                  id="outlined-size-small"
                  variant="outlined"
                  size="small"
                  value={this.state.Age}
                  onChange={this.handleChange}
                  required
                />
                <div className="error">
                  {errors.Age.length > 0 && (
                    <span className="errorMessage">{errors.Age}</span>
                  )}
                </div>
              </div>
            </div>
            <div className="user-Gender">
              <div className="user-Gender-Text">Gender</div>
              <div className="user-Gender-Radio">
                <RadioGroup
                  aria-label="gender"
                  className="radiobutton1"
                  value={this.state.genderType}
                  onChange={this.genderTypeHandle}
                >
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="male"
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="female"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="other"
                  />
                </RadioGroup>
                <div className="error">
                  {/* {errors.accountType.length > 0 && (
                    <span className="errorMessage">{errors.accountType}</span>
                  )} */}
                </div>
              </div>
            </div>
            <div className="user-Qualification">
              <div className="user-Qualification-Text">Qualification :</div>
              <div className="user-Qualification-Input">
                <TextField
                  label="Qualification"
                  InputLabelProps={{ style: { fontSize: 15 } }}
                  type="text"
                  name="Qualification"
                  id="outlined-size-small"
                  variant="outlined"
                  size="small"
                  value={this.state.Qualification}
                  onChange={this.handleChange}
                  required
                />
                <div className="error">
                  {errors.Qualification.length > 0 && (
                    <span className="errorMessage">{errors.Qualification}</span>
                  )}
                </div>
              </div>
            </div>
            <div className="user-Address">
              <div className="user-Address-Text">Address :</div>
              <div className="user-Address-Input">
                <TextField
                  label="Address"
                  InputLabelProps={{ style: { fontSize: 15 } }}
                  type="text"
                  name="Address"
                  id="outlined-size-small"
                  variant="outlined"
                  size="small"
                  value={this.state.Address}
                  onChange={this.handleChange}
                  required
                />
                <div className="error">
                  {errors.Address.length > 0 && (
                    <span className="errorMessage">{errors.Address}</span>
                  )}
                </div>
              </div>
            </div>
            <div className="user-Occupation">
              <div className="user-Occupation-Text">Occupation :</div>
              <div className="user-Occupation-Input">
                <TextField
                  label="Occupation"
                  InputLabelProps={{ style: { fontSize: 15 } }}
                  type="text"
                  name="Occupation"
                  id="outlined-size-small"
                  variant="outlined"
                  size="small"
                  value={this.state.Occupation}
                  onChange={this.handleChange}
                  required
                />
                <div className="error">
                  {errors.Occupation.length > 0 && (
                    <span className="errorMessage">{errors.Occupation}</span>
                  )}
                </div>
              </div>
            </div>
            <div className="user-Information-Button">
              <div className="user-Back-Button">
                <Button variant="primary" onClick={this.handleSubmit}>
                  Back
                </Button>
              </div>
              <div className="user-Submit-Button">
                <Button variant="primary" onClick={this.handleSubmit}>
                  Submit
                </Button>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    );
  }
}

export default Detail;
