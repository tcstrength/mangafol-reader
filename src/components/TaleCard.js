import { Card, Col, Row, Badge, Button, ButtonGroup } from "react-bootstrap";
import { featured } from "../constants/Images";
import { mapReadingStatus, mapTaleFinished, mapReadingStatusToColor, mapRating } from "../constants/Config";
import { useState } from "react";
import { timeSince } from "../utils/DateUtils";

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

  var { tale } = props;

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

  var readButton = <a href={tale.linkDisplay} target="_blank" rel="noreferrer" className="btn btn-success">Đọc ngay</a>

  if (tale.linkDisplay === '') {
    readButton = <a href={`/tales/${tale.slug}`} className="btn btn-primary">Truy cập</a>
  }

  var cardStyle = { backgroundColor: mapReadingStatusToColor(tale.readingStatus) }
  return (
    <Card className="p-0 mb-3" style={cardStyle}>
      <a href={`/tales/${tale.slug}`} style={{ color: "inherit", textDecoration: "none" }}>
        <Card.Img
          height="200px"
          style={{ objectFit: "cover" }}
          variant="top"
          className="embed-responsive-item"
          src={transferFeaturedImg(tale.featuredImg)} />
        <Card.Body>
          <Card.Title className="mb-0 text-truncate h6">{tale.title}</Card.Title>
          <Card.Text className="mb-0"><small className="text-muted">
            {timeSince(tale.ut)}
            <span className="pr-1"></span>
            {renderRating(tale.rating)}
            <span className="pr-1"></span>
            {renderReadingStatus(tale.readingStatus)}</small></Card.Text>
          <Card.Text className="mb-1">
            <small>

            </small>
          </Card.Text>
          <Card.Text className="my-0">
            Chương <strong>{tale.chapter}</strong>
            {tale.author !== '' && ` - ${tale.author}`}
          </Card.Text>
          <Card.Text>
            {transferDescription(tale.description)}
          </Card.Text>
        </Card.Body>
      </a>
      {/* <Card.Footer className="px-1 py-1">
        <ButtonGroup className="w-100 " aria-label="Tale Controls">
          {readButton}
        </ButtonGroup>
      </Card.Footer> */}
    </Card >
  );
}

export default TaleCard;