import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';
import LogoComponent from './Logo_Component'

function NavbarComponent(){
    return (
    <React.Fragment>
        <Navbar sticky="top" bg="light" expand='lg'>
            <Container>
            <Link to='/'><Navbar.Brand><LogoComponent /></Navbar.Brand></Link>
            <Navbar.Toggle aria-controls='toggle-navbar' />
            <Navbar.Collapse id='toggle-navbar'>
                <Nav className='ml-auto mr-5'>
                <Nav.Link as={Link} to='/about'>About</Nav.Link>
                <Nav.Link as={Link} to='/subscribe'>Subscribe</Nav.Link>
                <Nav.Link as={Link} to='/contact'>Contact Us</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    </React.Fragment>
    )
}

export default NavbarComponent