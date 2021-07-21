import { Component } from "react";
import { Nav, Navbar, Container, FormControl, InputGroup } from "react-bootstrap";
import ReactLogo from "../logo.svg";
import UserAvatar from "../resources/user.svg";
import SearchIcon from "../resources/search.svg";
import { UserActions } from "../actions/UserActions";
const apiCalls = require("../actions/ApiCalls");

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      login: false,
      me: null
    }
  }

  componentDidMount() {
    const profile = apiCalls.userProfile;

    if (profile !== null) {
      this.setState({ login: true, me: profile })
    } else {
      const promise = UserActions.me();
      promise.then((resp) => {
        const profile = resp.data.content;
        this.setState({
          login: true,
          me: profile
        })

        apiCalls.setUserProfile(profile);
      }).catch((resp) => {
        console.log("Redirect to login page");
      })
    }
  }

  render() {
    const { login, me } = this.state;

    var profile = (
      <>
        <Nav.Link href="/login" className="d-flex">
          Đăng nhập
        </Nav.Link>
        <Nav.Link href="/register" className="d-flex">
          Đăng ký
        </Nav.Link>
      </>
    )

    if (login) {
      var fullName = `${me.lastName} ${me.firstName}`;
      profile = (
        <Nav.Link href="/profile" className="d-flex">
          <img
            alt="User Avatar" src={UserAvatar} width="24" height="24" className="mx-1" />
          {fullName}
        </Nav.Link>
      )
    }

    return (
      <Navbar collapseOnSelect className="shadow-lg rounded" expand="lg" bg="light" variant="light" sticky="top">
        <Container>
          <Navbar.Brand href="/">
            <img
              alt="Mangafol Logo" src={ReactLogo} width="30" height="30" className="d-inline-block align-top" />
            {' '} Mangafol
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/tales">Chia sẻ truyện</Nav.Link>
              <Nav.Link href="/posts">Bài viết</Nav.Link>
            </Nav>
            <Nav>
              <InputGroup size="sm">
                <FormControl type="text" placeholder="Tìm truyện" className="mr-5" />
                <InputGroup.Text><img
                  alt="" src={SearchIcon} width="16" height="16" className="d-inline-block align-middle" />
                  {' '}
                </InputGroup.Text>
              </InputGroup>
            </Nav>
            <Nav>
              {profile}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  }
}

export default Header;