import { Component } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { UserActions } from "../actions/ApiCalls";

export default class TaleSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      summary: {
        userId: 0,
        taleCount: 0,
        taleReadingCount: 0,
        taleDropCount: 0
      }
    }
  }

  componentDidMount() {
    UserActions.summary().then((resp) => {
      this.setState({ summary: resp.data.content })
    })
  }

  render() {
    return (
      <Card className="p-1 pb-2 bg-secondary text-light">
        <Card.Body className="text-center">
          <h5>Tổng truyện</h5>
          <hr></hr>
          <p>Theo dõi <strong>{this.state.summary.taleReadingCount}</strong> truyện</p>
          <p>Drop <strong>{this.state.summary.taleDropCount}</strong> truyện</p>
        </Card.Body>
      </Card>
    )
  }
}