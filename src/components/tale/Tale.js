import { Component } from "react";
import { Card, Button, Col } from "react-bootstrap";
import DefaultFeaturedImg from "../../resources/image.svg";

class Tale extends Component {
  constructor(props) {
    super(props);
    this.state = { tale: props.tale }
  }

  getRandomString() {
    var length = Math.floor(Math.random() * 100);
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for (var i = 0; i < length; i++) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
  }

  render() {
    var { title, featuredImg, description, author, chapter } = this.state.tale

    if (featuredImg == '') {
      featuredImg = DefaultFeaturedImg
    }

    console.log(this.state.tale)

    return (
      <Col md={3}>
        <Card className="p-0 my-3 mx-auto" style={{ width: '15rem' }}>
          <Card.Img variant="top" src={featuredImg} />
          <Card.ImgOverlay>
          </Card.ImgOverlay>
          <Card.Body className="overflow-auto">
            <Card.Title>{title}</Card.Title>
            <Card.Text className="text-secondary">
              Chương {chapter}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    );
  }
}

export default Tale;