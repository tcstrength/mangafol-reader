import { Card, Col, Row, Badge, Button, ButtonGroup } from "react-bootstrap";
import { featured } from "../constants/Images";
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
    } else if (rating >= 0) {
      badge = <Badge className="bg-danger rounded-pill">{text}</Badge>
    }

    return badge;
  }

  var { tale } = props;

  const renderReadingStatus = (readingStatus) => {
    var badge = <Badge className="bg-danger rounded-pill">Chưa đọc</Badge>;

    if (readingStatus === 1) {
      badge = <Badge className="bg-success rounded-pill">Đang đọc</Badge>;
    } else if (readingStatus === 2) {
      badge = <Badge className="bg-secondary rounded-pill">Đã đọc xong</Badge>;
    }

    return badge;
  }

  const renderStatus = (finished) => {
    var badge = <Badge className="bg-primary rounded-pill">Đang tiến hành</Badge>;

    if (finished) {
      badge = <Badge className="bg-success rounded-pill">Hoàn thành</Badge>;
    }
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
          <Card.Title>{tale.title}</Card.Title>
          <Card.Text className="my-0"><small className="text-muted">{timeSince(tale.ct)}</small></Card.Text>
          <Card.Text className="my-2">
            {renderRating(tale.rating)}
            <span className="px-1"></span>
            {renderReadingStatus(tale.readingStatus)}
            <span className="px-1"></span>
            {renderStatus(tale.taleFinished)}
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
      <Card.Footer>
        <ButtonGroup className="w-100" aria-label="Tale Controls">
          {readButton}
        </ButtonGroup>
      </Card.Footer>
    </Card >
  );
}

export default TaleCard;