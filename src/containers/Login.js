import { Component } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { AuthActions, Store, UserActions } from "../actions/ApiCalls";
import LoginImage from "../resources/image.png";
import Dialog from "../components/Dialog";
import Loading from "../components/Loading";

export default class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      uname: '',
      passwd: '',
      success: false,
      failure: false,
      loading: false,
    }
  }

  handleSubmit = async e => {
    e.preventDefault()
    this.setState({ loading: true });
    const body = {
      uname: this.state.uname,
      passwd: this.state.passwd
    }

    const promise = AuthActions.login(body);
    promise.then((resp) => {
      const accessToken = resp.data.content.accessToken;
      Store.setAccessToken(accessToken)
      UserActions.profile(accessToken).then((resp) => {
        Store.setUserProfile(resp.data.content)
        this.setState({ loading: false, success: true })
        window.location.href = "/"
      })
    }).catch((resp) => {
      this.setState({ loading: false, failure: true })
    })
  }

  renderFailureDialog() {
    return (
      <Dialog
        show={this.state.failure}
        onHide={() => { this.setState({ failure: false }) }}
        title="Đăng nhập thất bại"
        content="Sài tài khoản hoặc mật khẩu"
        type="error"
        stext="Đăng ký"
        slink="/register"
        ptext="Thử lại"
        plink="" />
    )
  }

  render() {
    return (
      < Container className="p-5 d-flex flex-column" >
        {this.renderFailureDialog()}
        <Card className="mx-auto" style={{ width: '24rem' }}>
          <Card.Img variant="top" src={LoginImage} />
          <Card.Body>
            <Card.Title>Đăng nhập</Card.Title>
            <Card.Text>
              <Form className="mt-3" onSubmit={this.handleSubmit}>
                <Form.Group className="mb-3" controlId="uname">
                  <Form.Control required type="text" placeholder="Tên tài khoản" onChange={e => this.setState({ uname: e.target.value })} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="passwd">
                  <Form.Control required type="password" placeholder="Mật khẩu" onChange={e => this.setState({ passwd: e.target.value })} />
                </Form.Group>
                <Button className="w-100" type="submit">
                  {
                    this.state.loading &&
                    <Loading />
                  }
                  {' '}
                  Đăng nhập
                </Button>
                {/* <Form.Group controlId="login">
                  <Form.Control className="btn-success" type="submit" value="Đăng nhập">
                    <Loading></Loading>
                  </Form.Control>
                </Form.Group> */}
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