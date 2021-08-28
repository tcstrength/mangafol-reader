import { timeSince } from "../utils/DateUtils";
import { featured } from "../constants/Images";
import { Row, Col, Card, Badge, Button } from "react-bootstrap";
import { mapReadingStatus, mapTaleFinished, mapReadingStatusToColor, googleSearch } from "../constants/Config";

function TaleListItem(props) {
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

  const transferFeaturedImg = (featuredImg) => {
    if (featuredImg === null) {
      return featured;
    }

    return featuredImg.viewPath;
  }

  const item = props.tale;

  var cardStyle = { backgroundColor: mapReadingStatusToColor(item.readingStatus) }
  return (
    <Card className="mb-2" style={cardStyle}>
      <Row>
        <Col md={2}>
          <Card.Img height="100px" src={transferFeaturedImg(item.featuredImg)}
            style={{ objectFit: "cover" }}>
          </Card.Img>
        </Col>
        <Col md={7} className="p-2">
          <Card.Text className="mb-0">
            <h6>{item.title}</h6>
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
        </Col>
        <Col md={3} className="p-2">
          <a target="_blank">Sao chép</a>
          <span className="pr-3"></span>
          <a target="_blank" href={googleSearch(item.title)}>Google</a>
          {/* <Button>Thêm truyện</Button> */}
        </Col>
      </Row>


    </Card>
  )
}

export default TaleListItem;