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
      <Card>
        <Card.Img variant="top" className="embed-responsive-item" src={this.transferFeaturedImg(tale.featuredImg)} />
        <Card.Body>
          <Card.Title>{tale.title}</Card.Title>
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
    );
  }
}

export default TaleCard;