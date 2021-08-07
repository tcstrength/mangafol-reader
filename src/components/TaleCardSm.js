import { Card, Col, Row, Badge } from "react-bootstrap";
import { featured } from "../constants/Images";
import { useState } from "react";
import { timeSince } from "../utils/DateUtils";
import { mapTaleFinished, mapReadingStatus } from "../constants/Config";

function TaleCard(props) {
  const transferDescription = (description) => {
    if (description === '') {
      return 'Không có mô tả'
    }

    return description;
  }

  const transferFeaturedImg = (featuredImg) => {
    if (featuredImg === null) {
      return featured;
    }

    return featuredImg.viewPath;
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

  var { tale } = props;

  var cardStyle = {}

  if (tale.readingStatus === 0) {
    cardStyle = { backgroundColor: "#FFF0F0" }
  } else if (tale.readingStatus === 2) {
    cardStyle = { backgroundColor: "#F0F0FF" }
  }

  return (
    <Card className="mb-3" style={cardStyle}>
      <a href={`/tales/${tale.slug}`} style={{ color: "inherit", textDecoration: "none" }}>

        <Row>

          <Col sm={4}>
            <Card.Img height="140px" src={transferFeaturedImg(tale.featuredImg)}
              style={{ objectFit: "cover" }}>

            </Card.Img>
          </Col>

          <Col md={8} className="py-3" >
            <div className="d-flex flex-column justify-content-between h-100">
              <div>
                <h6 className="py-0 my-0 text-truncate">{tale.title}</h6>
                <small>
                  {renderRating(tale.rating)}
                  <span className="pr-1"></span>
                  {renderReadingStatus(tale.readingStatus)}
                </small>
                <br></br>
                <small className="text-muted">{timeSince(tale.ut)}</small>
                <br></br>
                <small>Chương <strong>{tale.chapter}</strong></small>
              </div>
              {/* <a href={`/tales/${tale.slug}`} className="btn btn-outline-primary btn-sm w-100">Ghi chú</a> */}
            </div>
          </Col>
        </Row>
      </a>
    </Card >
  );
}

export default TaleCard;