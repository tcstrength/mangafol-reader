import { Component } from "react";
import { Store, UserActions } from "../actions/ApiCalls";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uname: props.match.params.uname
    }
  }

  render() {
    return (
      <p>Đang cập nhật</p>
    )
  }
}