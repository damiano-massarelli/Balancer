import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { NavLink } from 'react-router-dom'
import { withRouter } from "react-router";

/**
 * The main navbar of the application.
 */
function MainNavbar(props) {
  const { location } = props;
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={NavLink} to="/">Balancer</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto" activeKey={location.pathname}>
          <Nav.Link as={NavLink} to="/users/">Users</Nav.Link>
          <Nav.Link as={NavLink} to="/groups/">Groups</Nav.Link>
          <Nav.Link as={NavLink} to="/history/">History</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
const RoutedNavbar = withRouter(MainNavbar);
export default RoutedNavbar; 