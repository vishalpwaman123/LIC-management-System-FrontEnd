import React, { Component } from "react";
import "../../Static/Dashboard.scss";

import Button from "@material-ui/core/Button";

export class UserDashboaed extends Component {
  AddDetailButton = () => {
    this.props.history.push("/userDetail");
  };

  render() {
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
                onClick={this.AddDetailButton}
              >
                Add User Detail
              </Button>
              <Button className="menu-Option" color="primary">
                My Lic Policies
              </Button>
              <Button className="menu-Option" color="primary">
                Buy Lic Policies
              </Button>
            </div>
            <div className="main-body"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserDashboaed;
