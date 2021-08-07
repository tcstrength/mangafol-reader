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
        taleDropCount: 0,
        taleDoneCount: 0
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
      <Card className="bg-secondary text-light">
        <Card.Body>
          <h5>Tổng {this.state.summary.taleCount} truyện</h5>
          <hr></hr>
          <p className="mb-2">Theo dõi <strong style={{ color: "#62ddbd" }}>{this.state.summary.taleReadingCount}</strong> truyện</p>
          <p className="mb-2">Ngưng theo dõi <strong style={{ color: "#f76d82" }}>{this.state.summary.taleDropCount}</strong> truyện</p>
          <p className="mb-1">Đã đọc xong <strong style={{ color: "#73b1f4" }}>{this.state.summary.taleDoneCount}</strong> truyện</p>
        </Card.Body>
      </Card >
    )
  }
}