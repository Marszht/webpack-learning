import React, { Component } from "react";
import { Button, DatePicker } from "antd";
import _ from "lodash";

export default class home extends Component {
  render() {
    return (
      <div>
        <Button type="primary">ListPage</Button>
        {_.join(["1", "2"])}
      </div>
    );
  }
}
