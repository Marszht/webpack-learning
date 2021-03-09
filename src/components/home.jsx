import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import "./components.scss";

export default class home extends Component {
  render() {
    return (
      <div className="router">
        <Link to="/list">HomePage</Link>
      </div>
    );
  }
}
