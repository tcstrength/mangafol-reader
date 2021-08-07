import { Card, Col, Row, Badge, Button, ButtonGroup } from "react-bootstrap";
import { featured } from "../constants/Images";
import { mapReadingStatus, mapTaleFinished } from "../constants/Config";
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

  return (
    <Card className="p-0 mb-3">
      <a href={`/tales/${tale.slug}`} style={{ color: "inherit", textDecoration: "none" }}>
        <Card.Img
          height="200px"
          style={{ objectFit: "cover" }}
          variant="top"
          className="embed-responsive-item"
          src={transferFeaturedImg(tale.featuredImg)} />
        <Card.Body>
          <Card.Title className="mb-0 text-truncate h6">{tale.title}</Card.Title>
          <Card.Text className="mb-0"><small className="text-muted">{timeSince(tale.ut)}</small></Card.Text>
          <Card.Text className="mb-1">
            <small>
              {renderRating(tale.rating)}
              <span className="pr-1"></span>
              {renderReadingStatus(tale.readingStatus)}
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