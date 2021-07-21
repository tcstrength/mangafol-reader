import { Component } from "react";
import { Card, Col, Row } from "react-bootstrap";
import DefaultFeaturedImg from "../../resources/image.svg";

class TaleCard extends Component {
  constructor(props) {
    super(props);
    this.state = { tale: props.tale }
  }

  transferDescription(description) {
    if (description === '') {
      return 'Không có mô tả'
    }

    return description;
  }

  transferFeaturedImg(featuredImg) {
    if (featuredImg === '') {
      return DefaultFeaturedImg;
    }

    return featuredImg;
  }

  render() {
    var { tale } = this.state;

    return (
      <a href={`/tales/${tale.id}`} style={{ color: "inherit", textDecoration: "none" }}>
        <Card className="p-0 mb-3">
          <Card.Img height="300px" style={{ objectFit: "cover" }} variant="top" className="embed-responsive-item" src={this.transferFeaturedImg(tale.featuredImg)} />
          <Card.Body>
            <Card.Title style={{ textTransform: "capitalize" }}>{tale.title}</Card.Title>
            <Row>
              <Col md={6}>
                <Card.Text className="text-secondary">
                  Chương {tale.chapter}
                </Card.Text>
              </Col>
              <Col md={6}>
                <Card.Text className="">
                </Card.Text>
              </Col>
            </Row>

            <Card.Text >
              {this.transferDescription(tale.description)}
            </Card.Text>
          </Card.Body>
        </Card>
      </a>
    );
  }
}

export default TaleCard;