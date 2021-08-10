import { Component } from "react";
import { Row, Col, Card, Badge } from "react-bootstrap";
import { Store, UserActions, TaleActions } from "../actions/ApiCalls";
import LoadingDialog from "../components/LoadingDialog";
import RankList from "../components/RankList";
import { timeSince } from "../utils/DateUtils";
import { mapReadingStatus, mapTaleFinished } from "../constants/Config";
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
    const renderReadingStatus = (readingStatus) => {
      var map = mapReadingStatus(readingStatus);
      var badge = <Badge className={`bg-${map.variant} rounded-pill`}>{map.text}</Badge>;
      return badge;
    }

    const renderStatus = (finished) => {
      var map = mapTaleFinished(finished)
      var badge = <Badge className={`bg-${map.variant} rounded-pill`}>{map.text}</Badge>;
      return badge;
    }

    const renderRating = (rating) => {
      var badge = <Badge className="bg-secondary rounded-pill">Chưa đánh giá</Badge>
      var text = `${rating}/10`;

      // console.log(text)

      if (rating >= 7) {
        badge = <Badge className="bg-success rounded-pill">{text}</Badge>
      } else if (rating >= 5) {
        badge = <Badge className="bg-warning rounded-pill">{text}</Badge>
      } else if (rating > 0) {
        badge = <Badge className="bg-danger rounded-pill">{text}</Badge>
      }

      return badge;
    }

    return (
      <Card className="p-2 mb-2">
        <Card.Text className="mb-0">
          {item.title}
        </Card.Text>
        <Card.Text className="mb-0">
          <small className="text-muted">{timeSince(item.ut)}
            <span className="pr-1"></span>
            {renderRating(item.rating)}
            <span className="pr-1"></span>
            {renderReadingStatus(item.readingStatus)}</small>
        </Card.Text>
        <Card.Text>
          Chương <strong>{item.chapter}</strong>
        </Card.Text>
      </Card>
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