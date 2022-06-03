import {Container, Navbar} from "react-bootstrap";
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
            </Navbar.Collapse>
          </Container>
        </Navbar>
    );
}

export default Header;