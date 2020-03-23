import React from 'react'
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const NavBar = props => {
  const { logoutUser } = props
  const { isAuthenticated, user } = props.authStore

  const userNav = isAuthenticated => {
    if (isAuthenticated) {
      return (
        <Nav className="justify-content-end">
          <NavDropdown alignRight title={user.login ? user.login : 'Usuário'} id="basic-nav-dropdown">
            <LinkContainer to="/auth/dashboard">
              <NavDropdown.Item active={false}>Dashboard</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/auth/profile">
              <NavDropdown.Item active={false}>Meus dados</NavDropdown.Item>
            </LinkContainer>
            <NavDropdown.Divider />
            <NavDropdown.Item>
              <Button variant="primary" block onClick={() => logoutUser()}>
                Logout
              </Button>
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      )
    } else {
      return (
        <Nav className="justify-content-end">
          <LinkContainer to="/auth/login">
            <Nav.Link>Login</Nav.Link>
          </LinkContainer>
        </Nav>
      )
    }
  }

  return (
    <React.Fragment>
      <Navbar bg="primary" variant="dark" expand="lg">
        <LinkContainer to="/">
          <Navbar.Brand>SEAD SPS</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/process">
              <Nav.Link>Processos</Nav.Link>
            </LinkContainer>
          </Nav>
          {userNav(isAuthenticated)}
        </Navbar.Collapse>
      </Navbar>
    </React.Fragment>
  )
}

export default NavBar
