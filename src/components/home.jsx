import React, { Component } from "react";
import _ from "lodash";

export default class home extends Component {
  render() {
    return <div>HomePage {_.join(["1", "3"])}</div>;
  }
}
