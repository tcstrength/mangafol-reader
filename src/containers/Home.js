import { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Banner from "../components/Banner";
import TaleList from "../components/tale/TaleList";

class Home extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Banner></Banner>
        </Row>
        <Row className="mt-5">
          <Col md={9}>
            <Row>
              <TaleList></TaleList>
            </Row>
          </Col>
          <Col md={3}></Col>
        </Row>
      </Container>
    );
  }
}

export default Home;