import { Component } from "react";
import { Col, Container, Row, Form, Button, Badge, Collapse } from "react-bootstrap";
import { TaleActions } from "../actions/TaleActions";
import LoadingDialog from "../components/LoadingDialog";
import Loading from "../components/Loading";
import DefaultFeaturedImg from "../resources/image.svg";
import AuthorIcon from "../resources/author.svg";
import FinishedIcon from "../resources/finished.svg";
import BookIcon from "../resources/book.svg";
import PlayIcon from "../resources/play.svg";
import RatingIcon from "../resources/rating.svg";


export default class TaleDetails extends Component {
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
        finished: true,
        showText: "fasdfasd"
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

  renderItem(head, icon, content) {
    if (content === null || content === '') {
      content = 'Chưa cập nhật';
    }

    return (
      <li className="pt-3">
        <img alt="" src={icon} width="20" className="align-middle" />
        <b className="mx-1 align-middle">{head}:</b>
        <span className="align-middle">{content}</span>
      </li>
    )
  }

  renderStatus(finished) {
    var badge = <Badge className="bg-primary rounded-pill align-middle">Đang tiến hành</Badge>;

    if (finished) {
      badge = <Badge className="bg-success rounded-pill align-middle">Hoàn thành</Badge>;
    }

    return (
      <li className="pt-3 align-middle">
        <img alt="" src={FinishedIcon} width="20" className="align-middle" />
        <b className="mx-1 align-middle">Tình trạng:</b>
        {badge}
      </li>
    )
  }

  renderRating(rating) {
    var badge = <Badge className="bg-secondary rounded-pill align-middle">Chưa đánh giá</Badge>
    var text = `${rating}/10`;

    console.log(text)

    if (rating > 8) {
      badge = <Badge className="bg-success rounded-pill align-middle">{text}</Badge>
    } else if (rating > 5) {
      badge = <Badge className="bg-warning rounded-pill align-middle">{text}</Badge>
    } else if (rating >= 0) {
      badge = <Badge className="bg-danger rounded-pill align-middle">{text}</Badge>
    }

    return (
      <li className="pt-3">
        <img alt="" src={RatingIcon} width="20" className="align-middle" />
        <b className="mx-1 align-middle">Đánh giá:</b>
        {badge}
      </li>
    )
  }

  render() {
    var { tale } = this.state

    return (
      <Container className="pt-5">
        <LoadingDialog show={this.state.loading}></LoadingDialog>
        <Row>
          <Col md={8}>
            <Row>
              <Col md={4}>
                <img src={this.transferFeaturedImg(tale.featuredImg)} alt=""></img>
              </Col>
              <Col md={8} className="px-5">
                <ul className="list-unstyled">
                  <li>
                    <h4 style={{ textTransform: "capitalize" }}>{tale.title}</h4>
                  </li>
                  {this.renderItem('Tác giả', AuthorIcon, tale.author)}
                  {this.renderItem('Chương', PlayIcon, tale.chapter)}
                  {this.renderRating(tale.rating)}
                  {this.renderStatus(tale.finished)}
                  {this.renderItem('Mô tả', BookIcon, tale.description)}
                </ul>
              </Col>

            </Row>
          </Col>
          <Col md={4}>
          </Col>
        </Row>
      </Container >
    )
  }
}