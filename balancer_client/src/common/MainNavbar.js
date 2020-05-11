import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { Link } from 'react-router-dom'

/**
 * The main navbar of the application.
 */
export default function MainNavbar(props) {

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/">Balancer</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/users/">Users</Nav.Link>
          <Nav.Link as={Link} to="/groups/">Groups</Nav.Link>
          <Nav.Link as={Link} to="/history/">History</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );

}