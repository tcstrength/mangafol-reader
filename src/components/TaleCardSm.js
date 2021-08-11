import { Card, Col, Row, Badge } from "react-bootstrap";
import { featured } from "../constants/Images";
import { useState } from "react";
import { timeSince } from "../utils/DateUtils";
import { mapTaleFinished, mapReadingStatus, mapReadingStatusToColor, mapRating } from "../constants/Config";

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
    var map = mapRating(rating)
    var badge = <Badge className={`bg-${map.variant} rounded-pill align-middle`}>{map.text}</Badge>
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

  var cardStyle = { backgroundColor: mapReadingStatusToColor(tale.readingStatus) }

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
                <small className="text-muted">
                  {timeSince(tale.ut)}
                </small>

                <br></br>
                <small className="mb-1">
                  {renderRating(tale.rating)}
                  <span className="pr-1"></span>
                  {renderReadingStatus(tale.readingStatus)}
                </small>
                <br></br>
                <p>Chương <strong>{tale.chapter}</strong></p>
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