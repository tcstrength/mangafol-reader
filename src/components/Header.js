import { Nav, Navbar, Container, FormControl, InputGroup } from "react-bootstrap";
import { Store } from "../actions/ApiCalls";
import { logo } from "../constants/Images";
import { ReactComponent as AvatarIcon } from "../resources/user.svg";
import Search from "./Search";

function Header(props) {
  var user = Store.userProfile;
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

  if (user !== null && user !== undefined) {
    profile = (
      <>
        <Nav.Link href="/profile" className="d-flex px-2">
          {user.firstName}
          <AvatarIcon width="24" height="24" className="ml-2" />
        </Nav.Link>
      </>
    )
  }

  return (
    <Navbar collapseOnSelect className="shadow-lg rounded" expand="lg" bg="light" variant="light" sticky="top">
      <Container>
        <Navbar.Brand href="/">
          <img
            alt="Mangafol Logo" src={logo} width="30" height="30" className="d-inline-block align-top" />
          {' '} Mangafol
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto w-25">
            <Search />
          </Nav>
          <Nav>

          </Nav>
          <Nav>
            <Nav.Link href="/tales">Chia sẻ truyện</Nav.Link>
            <Nav.Link href="/posts">Bài viết</Nav.Link>
            {profile}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header;