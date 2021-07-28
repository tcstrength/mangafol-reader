import { Card, Col, Row, Badge } from "react-bootstrap";
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

  return (
    <Card className="mb-3">
      <Row>

        <Col sm={5}>
          <Card.Img height="180px" src={transferFeaturedImg(tale.featuredImg)}
            style={{ objectFit: "cover" }}>

          </Card.Img>
        </Col>

        <Col md={6} className="py-3" >
          <div className="d-flex flex-column justify-content-between h-100">
            <div>
              <h6 className="py-0 my-0 text-truncate">{tale.title}</h6>
              {renderRating(tale.rating)}
              <br></br>
              <small className="text-muted">{timeSince(tale.ct)}</small>
              <br></br>
              <small>Chương <strong>{tale.chapter}</strong></small>
            </div>
            <a href={`/tales/${tale.slug}`} className="btn btn-outline-success btn-sm w-100">Truy cập</a>
          </div>
        </Col>
      </Row>

    </Card >
  );
}

export default TaleCard;