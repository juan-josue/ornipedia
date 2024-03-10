import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Row from 'react-bootstrap/Row';

export default function Header() {
  return (
    <div>
      <Row>
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto d-flex justify-content-between w-100">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">Species</Nav.Link>
                <NavDropdown title="About" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Creators</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    GrizzHacks Hackathon
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Technologies Used</NavDropdown.Item>
                  <NavDropdown.Divider />
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Row>
    </div>
  );
}
