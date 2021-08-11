import { Component } from "react";
import { Row, Col, Card, Badge } from "react-bootstrap";
import { Store, UserActions, TaleActions } from "../actions/ApiCalls";
import LoadingDialog from "../components/LoadingDialog";
import RankList from "../components/RankList";

import TaleListItem from "../components/TaleListItem";

export default class Public extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uname: props.match.params.uname,
      list: [],
      loading: true
    }
  }

  componentDidMount() {
    TaleActions.getPublicPaging(0, 1000, this.state.uname).then((resp) => {
      this.setState({ list: resp.data.content.list, loading: false })
    })
  }

  renderItem(item) {
    return (
      <TaleListItem tale={item}></TaleListItem>
    )
  }

  render() {
    return (
      <Row>
        <LoadingDialog loading={this.state.loading} />
        <Col md={8}>
          <Card className="p-0 mb-3 border-secondary bg-secondary text-light">
            <Card.Body>
              <Card.Title style={{ textTransform: "capitalize", padding: 0, margin: 0 }}>Con đường tu tiên của {this.state.uname}</Card.Title>
            </Card.Body>
          </Card>
          {this.state.list.map(item => this.renderItem(item))}
        </Col>
        <Col md={4}>
          <RankList>

          </RankList>
        </Col>

      </Row>
    )
  }
}