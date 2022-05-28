import {Container, Nav, Navbar} from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';

function Header() {
    return(
        <Navbar bg="light" expand="lg">
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>Sequence Alignment Matcher</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <LinkContainer to="/stats">
                  <Nav.Link>Statistics</Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    );
}

export default Header;