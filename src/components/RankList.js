import { Component } from "react";
import { Card, Row, Col } from "react-bootstrap";
import Loading from "./Loading";
import { UserActions } from "../actions/ApiCalls";

export default class RankList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      list: []
    }
  }

  componentDidMount() {
    UserActions.rank().then((resp) => {
      this.setState({ list: resp.data.content.list })
      this.setState({ loading: false })
    })
  }

  renderItem(item, id) {
    return (
      <Row className="mb-2">
        <Col md={1} className="text-muted">
          {id + 1}
        </Col>
        <Col md={5} className="text-primary">
          {item.uname}
        </Col>
        <Col md={6}>
          <strong>{item.taleCount}</strong> truyện
        </Col>
      </Row>
    )
  }

  render() {
    return (
      <>
        <Card className="p-0 mb-3 border-primary bg-primary text-light">
          <Card.Body>
            <Card.Title style={{ textTransform: "capitalize", padding: 0, margin: 0 }}>Tu tiên bảng</Card.Title>
          </Card.Body>
        </Card>

        {this.state.loading &&
          <div className="w-100 text-center pt-2 pb-4">
            <Loading size="md" />
          </div>
        }

        {!this.state.loading &&
          <Card className="mb-3 p-3">
            {this.state.list.map((item, id) => this.renderItem(item, id))}
          </Card>
        }
      </>
    )
  }
}