import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'

import { userIsAuthenticated } from '../helpers/auth'

const PageNavbar = () => {

  // Navigate
  const navigate = useNavigate()

  // ? This function removes the token and navigates to the login page
  const handleLogout = () => {
    // Remove the token from local storage
    window.localStorage.removeItem('retro-shirt-final-db')
    // Navigate to the login page
    navigate('/login')
  }
  return (
    <Navbar bg="warning" expand="sm">
      <Container>
        {/* Navbar brand */}
        {/* Wherever you use a href on a bootstrap component, replace it with an as={Link} and a to="/" */}
        <Navbar.Brand as={Link} to="shirts">👕</Navbar.Brand>
        {/* Navbar Toggle is our mobile burger icon - this is displayed at a breakpoint specified on the Navbar component above */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {/* Navbar collapse is our menu wrapped in a collapsible container for mobile */}
        <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
          {/* Nav Link is an individual link inside a nav. Same as Nav Brand, to spcifiy react navigation use "as" and "to" */}
          <Nav.Link as={Link} to="/shirts">Shirts</Nav.Link>
          {userIsAuthenticated() ?
            <>
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </>
            :
            <>
              <Nav.Link as={Link} to="/register">Register</Nav.Link>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/auth/:id/">Favourites</Nav.Link>
            </>
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default PageNavbar
