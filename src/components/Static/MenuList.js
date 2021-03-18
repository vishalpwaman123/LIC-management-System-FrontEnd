import React, { Component } from "react";
import "./Dashboard.css";

export class MenuList extends Component {
  render() {
    return (
      <div className="itemMenu--content">
        <div className="current-Menu">{this.props.type}</div>
      </div>
    );
  }
}

export default MenuList;
