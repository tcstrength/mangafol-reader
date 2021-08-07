import { Component } from "react";
import { Store, UserActions } from "../actions/ApiCalls";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id
    }
  }

  render() {
    const { id } = this.state;
    if (id === null || id === undefined || id == Store.userProfile.id) {
      return (
        <p>Private profile</p>
      )
    }

    return (
      <p>Public profile</p>
    )
  }
}