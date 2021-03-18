import React, { useEffect, useState } from "react";
import "../../Static/Dashboard.scss";
import MenuList from "../../Static/MenuList.js";
import userService from "../../../services/userServices";

import Button from "@material-ui/core/Button";
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";


const User_service = new userService();

function UserDashboaed() {
  const history = useHistory();
  const [policiesState, setPoliciesState] = useState(false);
  const [detailStatus, setDetailStatus] = useState(true);
  const [buyPoliciesStatus, setBuyPoliciesStatus] = useState(false);

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

  const [policiesList, setPoliciesList] = useState(lic_policies_List);
  const AddDetailButton = () => {
    history.push({
      pathname: "/userDetail",
    });
  };

  const location = useLocation();

  useEffect(() => {
    console.log(location.pathname); // result: '/secondpage'
    console.log(location.search); // result: '?query=abc'
    console.log(location.state.detail); // result: 'some_value'
  }, [location]);

  const showPolicies = () => {
    setPoliciesState(true);
    setDetailStatus(false);
  };

  const showBuyPolicies = () => {
    setBuyPoliciesStatus(true);
    setDetailStatus(false);
  };

  return (
    <div className="user-Dashboard-Container">
      <div className="sub-container">
        <div className="header">
          <div className="text font-families">Customer Dashboard</div>
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
              Add User Detail
            </Button>
            <Button
              className="menu-Option"
              color="primary"
              onClick={() => {
                showPolicies();
              }}
            >
              My Lic Policies
            </Button>
            <Button
              className="menu-Option"
              color="primary"
              onClick={() => {
                showBuyPolicies();
              }}
            >
              Buy Lic Policies
            </Button>
          </div>
          {detailStatus ? (
            <div className="main-body">
              <div className="user-Name-Dashboard">
                <div className="name-Text">Name :</div>
                <div className="name-TextField"></div>
              </div>
              <div className="user-Email-Dashboard">
                <div className="Email-Text">Email :</div>
                <div className="Email-TextField"></div>
              </div>
              <div className="user-Qualification-Dashboard">
                <div className="Qualification-Text">Qualification :</div>
                <div className="Qualification-TextField"></div>
              </div>
              <div className="user-Occupation-Dashboard">
                <div className="Occupation-Text">Occupation :</div>
                <div className="Occupation-TextField"></div>
              </div>
              <div className="user-Address-Dashboard">
                <div className="Address-Text">Address :</div>
                <div className="Address-TextField"></div>
              </div>
              <div className="user-Age-Dashboard">
                <div className="Age-Text">Age :</div>
                <div className="Age-TextField"></div>
              </div>
              <div className="user-Gender-Dashboard">
                <div className="Gender-Text">Gender :</div>
                <div className="Gender-TextField"></div>
              </div>
            </div>
          ) : policiesList ? (
            <div className="main-body">
              <div className="sub-MenuOption">
                {policiesList.map((itm) => {
                  return <MenuList key={itm.key} type={itm.type} />;
                })}
              </div>
            </div>
          ) : buyPoliciesStatus ? (
            <div className="main-body">
              <div className="sub-MenuOption">
                {policiesList.map((itm) => {
                  return <MenuList key={itm.key} type={itm.type} />;
                })}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default UserDashboaed;
