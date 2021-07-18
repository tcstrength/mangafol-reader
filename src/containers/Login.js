import { Component } from "react";
import { Container, Form, Modal, Button, Card } from "react-bootstrap";
import LoginImage from "../resources/image.svg";
import { AuthActions } from "../actions/AuthActions";
import Dialog from "../components/Dialog";

export default class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      uname: '',
      passwd: '',
      success: false
    }
  }

  handleSubmit = async e => {
    e.preventDefault()
    const { uname, passwd } = this.state;
    const result = await AuthActions.login(uname, passwd);

    if (result) {
      this.setState({ success: true })
    } else {

    }
  }

  renderSuccessDialog() {
    return (
      <Dialog
        show={this.state.success}
        onHide={() => { }}
        title="Đăng nhập thành công"
        content="Bạn đã đăng nhập thành công, chúc bạn một ngày vui"
        ptext="Trang chủ"
        plink="/"
        stext="Quản lý truyện"
        slink="/tales" />
    )
  }

  renderErrors() {

  }

  render() {
    return (
      < Container className="p-5 d-flex flex-column" >
        {this.renderSuccessDialog()}
        {this.renderErrors()}
        <Card className="mx-auto" style={{ width: '24rem' }}>
          <Card.Img variant="top" src={LoginImage} />
          <Card.Body>
            <Card.Title>Đăng nhập tài khoản Mangafol</Card.Title>
            <Card.Text>
              <Form className="mt-3" onSubmit={this.handleSubmit}>
                <Form.Group className="mb-3" controlId="uname">
                  <Form.Control required type="text" placeholder="Tên tài khoản" onChange={e => this.setState({ uname: e.target.value })} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="passwd">
                  <Form.Control required type="password" placeholder="Mật khẩu" onChange={e => this.setState({ passwd: e.target.value })} />
                </Form.Group>

                <Form.Group controlId="login">
                  <Form.Control className="btn-success" type="submit" value="Đăng nhập" />
                </Form.Group>
              </Form>
            </Card.Text>
          </Card.Body>
        </Card>
        <Card className="mx-auto mt-3 text-center" style={{ width: '24rem' }}>
          <Card.Body>
            <Card.Text>
              <span>
                Chưa có tài khoản? {' '}
                <a href="/register">
                  Đăng ký tài khoản
                </a>
              </span>
            </Card.Text>
          </Card.Body>
        </Card>
      </Container >
    );
  }
}