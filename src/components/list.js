import React, { Component } from "react";
import { Button, DatePicker } from "antd";
import { Link } from "react-router-dom";
import _ from "lodash";

import { add } from "../utils/utils";

import "./components.scss";

export default class list extends Component {
  render() {
    return (
      <div className="router">
        <Link to="/">ListPage, {add(1, 2)}</Link>
      </div>
    );
  }
}
