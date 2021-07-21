import { Component } from "react";
import { Container } from "react-bootstrap";
import LoadingDialog from "../components/LoadingDialog";

export default class Tales extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    this.setState({ loading: false })
  }

  render() {
    return (
      <Container className="pt-5">
        <LoadingDialog show={this.state.loading}></LoadingDialog>
        <p>Tales</p>
      </Container>
    )
  }
}