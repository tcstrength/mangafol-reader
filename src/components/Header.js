import { Component } from "react";
import { Nav, Navbar, Container, FormControl, InputGroup } from "react-bootstrap";
import ReactLogo from "../logo.svg";
import UserAvatar from "../resources/user.svg";
import SearchIcon from "../resources/search.svg";

class Header extends Component {
  render() {
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
              <Nav.Link href="/tales">Quản lý truyện</Nav.Link>
              {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
            <Nav>
              <InputGroup size="sm">
                <FormControl type="text" placeholder="Tìm truyện" className="mr-2" />
                <InputGroup.Text><img
                  alt="" src={SearchIcon} width="16" height="16" className="d-inline-block align-middle" />
                  {' '}
                </InputGroup.Text>
              </InputGroup>
            </Nav>
            <Nav>
              <Nav.Link href="/profile">
                <img
                  alt="User Avatar" src={UserAvatar} width="30" height="30" className="d-inline-block align-middle" />
                {' '}
                Thái Chí Cường
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  }
}

export default Header;