import React, { useEffect, useState } from "react";
import "../../Static/Dashboard.scss";
import MenuList from "../../Static/MenuList";
import userService from "../../../services/userServices";

import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";

var defaults = "NA";

const User_service = new userService();

function CEODashboaed() {
  const history = useHistory();
  const [policiesState, setPoliciesState] = useState(false);
  const [detailStatus, setDetailStatus] = useState(true);
  const [showbranches, setshowbranches] = useState(false);
  const [customer_id, setcustomer_id] = useState(0);
  const [customer_Name, setcustomer_Name] = useState("");
  const [email, setemail] = useState("");
  const [qualification, setqualification] = useState("");
  const [occupation, setoccupation] = useState("");
  const [address, setaddress] = useState("");
  const [age, setage] = useState("");
  const [gender, setgender] = useState("");
  const [refreshstatus, setrefreshstatus] = useState(false);
  const [Success, setSuccess] = useState(false);
  const [snackbaropen, setsnackbaropen] = useState(false);
  const lic_policies_List = [
    {
      key: 1,
      type: "Life Insurance",
    },
    {
      key: 2,
      type: "Motor insurance",
    },
    {
      key: 3,
      type: "Health insurance",
    },
    {
      key: 4,
      type: "Travel insurance",
    },
    {
      key: 5,
      type: "Property insurance",
    },
    {
      key: 6,
      type: "Mobile insurance",
    },
  ];

  const branch_List = [
    {
      key: 1,
      type: "Pune",
    },
    {
      key: 2,
      type: "Mumbai",
    },
    {
      key: 3,
      type: "Ahmedabad",
    },
    {
      key: 4,
      type: "Gurgaon",
    },
    {
      key: 5,
      type: "Jalgaon",
    },
  ];

  const [policiesList, setPoliciesList] = useState(lic_policies_List);
  const [branchesList, setBranchesList] = useState(branch_List);

  const AddDetailButton = () => {
    history.push({
      pathname: "/userDetail",
      search: "?query=id",
      state: { detail: customer_id, backdirection: "/CEODashboaed" },
    });
  };

  const HandleData = (Data) => {
    console.log(Data.customer_id);
    setemail(Data.email);
    setcustomer_Name(Data.customer_Name);
    setcustomer_id(Data.customer_id);
    setqualification(Data.qualification);
    setoccupation(Data.occupation);
    setaddress(Data.address);
    setage(Data.age);
    setgender(Data.gender);
    console.log(
      customer_Name,
      email,
      qualification,
      occupation,
      address,
      age,
      gender
    );
  };

  const location = useLocation();

  useEffect(() => {
    console.log(location.pathname); // result: '/secondpage'
    console.log(location.search); // result: '?query=abc'
    console.log(location.state.detail); // result: 'some_value'
    const user = {
      id: location.state.detail,
    };
    User_service.fetchDataById(user)
      .then((data) => {
        console.log(data.data.data[0]);
        HandleData(data.data.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [location, email]);

  const showPolicies = () => {
    console.log("show policies");
    setPoliciesState(true);
    setDetailStatus(false);
  };

  const showbranchesList = () => {
    console.log("show branches");
    setshowbranches(true);
    setPoliciesState(false);
    setDetailStatus(false);
  };

  const handleRefresh = (event) => {
    User_service.deleteAllData()
      .then((data) => {
        console.log(data.data.data.affectedRows);
        if (data.data.data.affectedRows == 0) {
          setSuccess(false);
          setrefreshstatus(true);
          setsnackbaropen(true);
        } else {
          setSuccess(true);
          setrefreshstatus(true);
          setsnackbaropen(true);
        }
        history.push({
          pathname: "/login",
        });
      })
      .catch((error) => {
        console.log(error);
        setSuccess(false);
        setrefreshstatus(true);
        setsnackbaropen(true);
      });
  };

  const handleLogOut = () => {
    history.push({
      pathname: "/login",
    });
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setsnackbaropen(false);
  };
  return (
    <div className="user-Dashboard-Container">
      <div className="sub-container">
        <div className="header">
          <div className="text font-families">CEO Dashboard</div>
          <div className="refresh-Button">
            <Button color="primary" variant="contained" onClick={handleRefresh}>
              Refresh
            </Button>
          </div>
          <div className="signOut-Button">
            <Button color="primary" variant="contained" onClick={handleLogOut}>
              Log Out
            </Button>
          </div>
        </div>
        <div className="container-body">
          <div className="sidebar">
            <Button
              className="menu-Option"
              color="primary"
              onClick={() => {
                AddDetailButton();
              }}
            >
              Add CEO Detail
            </Button>
            <Button
              className="menu-Option"
              color="primary"
              onClick={() => {
                showPolicies();
              }}
            >
              All Lic Policies
            </Button>
            <Button
              className="menu-Option"
              color="primary"
              onClick={() => {
                showbranchesList();
              }}
            >
              All Branches
            </Button>
          </div>
          {detailStatus ? (
            <div className="main-body">
              <div className="user-Name-Dashboard">
                <div className="name-Text">Name :</div>
                <div className="name-TextField">
                  {customer_Name == null ? defaults : customer_Name}
                </div>
              </div>
              <div className="user-Email-Dashboard">
                <div className="Email-Text">Email :</div>
                <div className="Email-TextField">
                  {email == null ? defaults : email}
                </div>
              </div>
              <div className="user-Qualification-Dashboard">
                <div className="Qualification-Text">Qualification :</div>
                <div className="Qualification-TextField">
                  {qualification == null ? defaults : qualification}
                </div>
              </div>
              <div className="user-Occupation-Dashboard">
                <div className="Occupation-Text">Occupation :</div>
                <div className="Occupation-TextField">
                  {occupation == null ? defaults : occupation}
                </div>
              </div>
              <div className="user-Address-Dashboard">
                <div className="Address-Text">Address :</div>
                <div className="Address-TextField">
                  {address == null ? defaults : address}
                </div>
              </div>
              <div className="user-Age-Dashboard">
                <div className="Age-Text">Age :</div>
                <div className="Age-TextField">
                  {age == null ? defaults : age}
                </div>
              </div>
              <div className="user-Gender-Dashboard">
                <div className="Gender-Text">Gender :</div>
                <div className="Gender-TextField">
                  {gender == null ? defaults : gender}
                </div>
              </div>
            </div>
          ) : policiesState ? (
            <div className="main-body">
              <div className="sub-MenuOption">
                {policiesList.map((itm) => {
                  return <MenuList key={itm.key} type={itm.type} />;
                })}
              </div>
            </div>
          ) : showbranches ? (
            <div className="main-body">
              <div className="sub-MenuOption">
                {branchesList.map((itm) => {
                  return <MenuList key={itm.key} type={itm.type} />;
                })}
              </div>
            </div>
          ) : (
            <h1>Hello</h1>
          )}
        </div>
      </div>

      <div className="AlertMessage">
        {refreshstatus ? (
          <Snackbar
            open={snackbaropen}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
          >
            {Success ? (
              <Alert onClose={handleSnackbarClose} severity="success">
                Database Refresh successful.
              </Alert>
            ) : (
              <Alert onClose={handleSnackbarClose} severity="error">
                Database Refresh Unsuccessful.
              </Alert>
            )}
          </Snackbar>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default CEODashboaed;
