import React, { Component } from "react";
import { Button, DatePicker } from "antd";
import { Link } from "react-router-dom";
import _ from "lodash";
import "./components.scss";

export default class list extends Component {
  render() {
    return (
      <div className="router">
        <Link to="/">ListPage</Link>
      </div>
    );
  }
}
