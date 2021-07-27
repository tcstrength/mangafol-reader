import { Component } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import LoginImage from "../resources/image.png";
import Dialog from "../components/Dialog";
import Loading from "../components/Loading";

export default class Register extends Component {
  constructor(props) {
    super(props)

    this.state = {
      uname: '',
      passwd: '',
      lastName: '',
      firstName: '',
      success: false,
      failure: false,
      loading: false
    }
  }

  handleSubmit = async e => {
    e.preventDefault()
    this.setState({ loading: true })
  }

  renderSuccessDialog() {
    return (
      <Dialog
        show={this.state.success}
        onHide={() => { this.setState({ success: false }) }}
        title="Đăng ký thành công"
        content={`Bạn đã đăng ký thành công tài khoản ${this.state.uname}`}
        ptext="Đăng nhập"
        plink="/login"
        stext="Trang chủ"
        slink="/" />
    )
  }

  renderFailureDialog() {
    return (
      <Dialog
        show={this.state.failure}
        onHide={() => { this.setState({ failure: false }) }}
        title="Đăng ký thất bại"
        content="Tài khoản đã tồn tại hoặc xảy ra lỗi khác"
        type="error"
        stext="Đăng nhập"
        slink="/login"
        ptext="Thử lại"
        plink="" />
    )
  }

  render() {
    return (
      < Container className="p-5 d-flex flex-column" >
        {this.renderSuccessDialog()}
        {this.renderFailureDialog()}
        <Card className="mx-auto" style={{ width: '24rem' }}>
          <Card.Img variant="top" src={LoginImage} />
          <Card.Body>
            <Card.Title>Đăng ký</Card.Title>
            <Card.Text>
              <Form className="mt-3" onSubmit={this.handleSubmit}>
                <div className="row">
                  <div className="col-7">
                    <Form.Group className="mb-3" controlId="lastName">
                      <Form.Control required type="text" placeholder="Họ" onChange={e => this.setState({ lastName: e.target.value })} />
                    </Form.Group>
                  </div>
                  <div className="col-5">
                    <Form.Group className="mb-3" controlId="firstName">
                      <Form.Control required type="text" placeholder="Tên" onChange={e => this.setState({ firstName: e.target.value })} />
                    </Form.Group>
                  </div>
                </div>
                <Form.Group className="mb-3" controlId="uname">
                  <Form.Control required type="text" placeholder="Tên tài khoản" onChange={e => this.setState({ uname: e.target.value })} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="passwd">
                  <Form.Control required type="password" placeholder="Mật khẩu" onChange={e => this.setState({ passwd: e.target.value })} />
                </Form.Group>
                <Button className="w-100" type="submit">
                  {this.state.loading && <Loading />}
                  {' '} Đăng ký
                </Button>
              </Form>
            </Card.Text>
          </Card.Body>
        </Card>
        <Card className="mx-auto mt-3 text-center" style={{ width: '24rem' }}>
          <Card.Body>
            <Card.Text>
              <span>
                Đã có tài khoản? {' '}
                <a href="/login">
                  Đăng nhập
                </a>
              </span>
            </Card.Text>
          </Card.Body>
        </Card>
      </Container >
    );
  }
}