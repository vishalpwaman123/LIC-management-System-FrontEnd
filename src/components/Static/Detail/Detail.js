import React, { useEffect, useState } from "react";
import "./Detail.css";

import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import TextField from "@material-ui/core/TextField";
import Button from "react-bootstrap/Button";
import { useLocation } from "react-router-dom";

import userService from "../../../services/userServices";
const User_service = new userService();

var id = null;

function Detail() {
  const [erroruserName, seterroruserName] = useState("");
  const [errorAge, seterrorAge] = useState("");
  const [errorQualification, seterrorQualification] = useState("");
  const [errorAddress, seterrorAddress] = useState("");
  const [errorOccupation, seterrorOccupation] = useState("");

  const [userName, setuserName] = useState("");
  const [Age, setAge] = useState("");
  const [Qualification, setQualification] = useState("");
  const [Address, setAddress] = useState("");
  const [Occupation, setOccupation] = useState("");
  const [genderType, setgenderType] = useState("male");
  // const [customer_id, setcustomer_id] = useState();

  const location = useLocation();

  useEffect(() => {
    console.log(location.pathname); // result: '/secondpage'
    console.log(location.search); // result: '?query=abc'
    console.log(location.state.detail); // result: 'some_value'
    id = location.state.detail;
    console.log(id);
  }, [location]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    let errorstatus = null;

    switch (name) {
      case "userName":
        errorstatus = value.length <= 3 ? "user Name is not valid" : "";
        seterroruserName(errorstatus);
        setuserName(value);
        break;
      case "Age":
        errorstatus = value.length <= 3 ? "Age is not valid" : "";
        seterrorAge(errorAge);
        setAge(value);
        break;
      case "Qualification":
        errorstatus = value.length > 3 ? "" : "Qualification not valid";
        seterrorQualification(errorstatus);
        setQualification(value);
        break;
      case "Address":
        errorstatus = value.length < 3 ? "Address Not valid" : "";
        seterrorAddress(errorstatus);
        setAddress(value);
        break;
      case "Occupation":
        errorstatus = value.length < 3 ? "Occupation not valid" : "";
        seterrorOccupation(errorstatus);
        setOccupation(value);
        break;

      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    // let errors = this.state.errors;

    if (userName == null) {
      seterroruserName("user Name Required");
    }
    if (Age == null) {
      errorAge("Age Required");
    }
    if (Qualification == null) {
      errorQualification("Qualification Required");
    }
    if (Address == null) {
      seterrorAddress("Address Required");
    }
    if (Occupation == null) {
      seterrorOccupation("Occupation Required");
    }

    if (
      userName === null ||
      Age === null ||
      Qualification === null ||
      Address === null ||
      Occupation === null
    ) {
      // flags.status = "Failed";
      console.error("Invalid Form");
    } else {
      const user = {
        customer_id: location.state.detail,
        customer_Name: userName,
        age: Age,
        gender: genderType,
        qualification: Qualification,
        address: Address,
        occupation: Occupation,
      };
      console.log("Calling Api", user);
      User_service.addUserdetail(user)
        .then((data) => {
          console.log("Login Data :", data);
          const object = data.data;
          console.log(object.success);
          console.log(object.message);
          /*Responses.Message = object.message;*/
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const genderTypeHandle = (event) => {
    event.preventDefault();
    const { value } = event.target;
    let genderTypes = genderType;
    console.log(value);
    setgenderType(genderTypes);
  };

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
                value={userName}
                onChange={handleChange}
                required
              />
              <div className="error">
                {erroruserName == "user Name is not valid" && (
                  <span className="errorMessage">{erroruserName}</span>
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
                value={Age}
                onChange={handleChange}
                required
              />
              <div className="error">
                {errorAge == "Age is not valid" && (
                  <span className="errorMessage">{errorAge}</span>
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
                value={genderType}
                onChange={genderTypeHandle}
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
                value={Qualification}
                onChange={handleChange}
                required
              />
              <div className="error">
                {errorQualification == "Qualification not valid" && (
                  <span className="errorMessage">{errorQualification}</span>
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
                value={Address}
                onChange={handleChange}
                required
              />
              <div className="error">
                {errorAddress == "Address Not valid" && (
                  <span className="errorMessage">{errorAddress}</span>
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
                value={Occupation}
                onChange={handleChange}
                required
              />
              <div className="error">
                {errorOccupation == "Occupation not valid" && (
                  <span className="errorMessage">{errorOccupation}</span>
                )}
              </div>
            </div>
          </div>
          <div className="user-Information-Button">
            <div className="user-Back-Button">
              {/* <Button variant="primary" onClick={handleSubmit}>
                Back
              </Button> */}
            </div>
            <div className="user-Submit-Button">
              <Button variant="primary" onClick={handleSubmit}>
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

export default Detail;
