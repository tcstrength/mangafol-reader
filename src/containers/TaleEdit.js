import { Component } from "react";
import { Col, Container, Row, Form, Button, Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { TaleActions } from "../actions/TaleActions";
import LoadingDialog from "../components/LoadingDialog";
import Loading from "../components/Loading";
import FeaturedImg from "../resources/image.svg";
import TaleCard from "../components/tale/TaleCard";

export default class TaleEdit extends Component {
  constructor(props) {
    super(props)
    console.log(props.match)
    this.state = {
      id: props.match.params.id ?? 0,
      loading: true,
      tale: {
        title: "",
        description: "",
        chapter: 1,
        author: "",
        finished: true
      }
    }
  }

  componentDidMount() {
    const promise = TaleActions.getById(this.state.id);

    promise.then((resp) => {
      const tale = resp.data.content;
      this.setState({ tale: tale, loading: false })
    }).catch((resp) => {
      console.log(resp);
      this.setState({ loading: false })
    })
  }

  renderSelect(options, selected) {
    return (
      <Form.Control required type="text" as="select">
        <option>Open this select menu</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </Form.Control>
    )
  }

  renderEdit() {
    var { tale } = this.state
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group className="mb-3" controlId="title">
          <Form.Control required type="text" placeholder="Tiêu đề truyện" value={tale.title}
            onChange={e => this.setState({ tale: { ...tale, title: e.target.value } })} />
        </Form.Group>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="author">
              <Form.Control required type="text" placeholder="Tác giả" value={tale.author}
                onChange={e => this.setState({ tale: { ...tale, author: e.target.value } })} />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="chapter">
              <Form.Control required type="number" maxLength="10" placeholder="Chapter" value={tale.chapter}
                onChange={e => this.setState({ tale: { ...tale, chapter: e.target.value } })} />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="chapter">
              {this.renderSelect({}, {})}
            </Form.Group>
          </Col>
          <Col md={6}>
            {this.renderSelect({}, {})}
          </Col>
        </Row>

        <Form.Group controlId="formFile" className="mb-3">
          <Form.Control type="file" className="form-control"
            onChange={e => this.setState({ tale: { ...tale, featuredImg: e.target.value } })} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="description">
          <Form.Control as="textarea" style={{ resize: "none" }} rows={3} placeholder="Mô tả/đánh giá cả bạn" value={tale.description}
            onChange={e => this.setState({ tale: { ...tale, description: e.target.value } })} />
        </Form.Group>

        <Button variant="success" className="w-100" type="submit">
          {
            this.state.loading &&
            <Loading />
          }
          {' '}
          Cập nhật
        </Button>
      </Form>
    )
  }

  render() {
    var { tale } = this.state

    return (
      <Container className="pt-5">
        <LoadingDialog show={this.state.loading}></LoadingDialog>
        <Row>
          <Col md={6}>
            {this.renderEdit()}
          </Col>
          <Col md={6}>
            <TaleCard tale={tale}></TaleCard>
          </Col>
        </Row>
      </Container>
    )
  }
}