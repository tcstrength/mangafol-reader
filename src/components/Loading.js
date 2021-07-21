import { Component } from "react";
import { Spinner } from "react-bootstrap";

export default class Loading extends Component {
  constructor(props) {
    super(props)


    if (props.size !== null) {
      this.state = {
        size: props.size
      }
    } else {
      this.state = {
        size: "sm"
      }
    }
  }
  render() {
    return (
      <Spinner
        as="span"
        animation="border"
        size={this.state.size}
        role="status"
        aria-hidden="true"
      />
    )
  }
}