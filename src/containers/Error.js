import { Component } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { AuthActions, Store, UserActions } from "../actions/ApiCalls";
import LoginImage from "../resources/image.png";
import Dialog from "../components/Dialog";
import Loading from "../components/Loading";

export default class Error extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <p>Đã có lỗi xảy ra</p>
    )
  }
}