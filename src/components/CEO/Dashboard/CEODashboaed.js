import React, { Component } from "react";
import "../../Static/Dashboard.scss";

export class CEODashboaed extends Component {
  render() {
    return (
      <div className="user-Dashboard-Container">
        <div className="sub-container">
          <div className="header">
            <div className="text font-families">CEO Dashboard</div>
          </div>
          <div className="container-body">
            <div className="sidebar"></div>
            <div className="main-body"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default CEODashboaed;