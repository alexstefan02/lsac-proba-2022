import React from 'react'
import './Navbar.css'
import Logo from './Logo.png'
import Vector from './Vector.png'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

const MainNavbar = ({setRoute, isSignedIn, setIsSignedIn, setIsPhoneWidth}) => {
  return (
      !isSignedIn ? 
      <Navbar expand="lg" className='navbar-component position-fixed'>
        <Container className="container-navbar-main"> 
          <Navbar.Brand className='p-2 margin-right'>          
            <img className='logo' src={Logo} alt='logo' />
          </Navbar.Brand>      
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <img src={Vector} alt='vector'/>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav" className="p-2">
            <Nav className="me-auto d-flex nav-links text-right">
              <a className='navigation signin p-2' onClick={() => setRoute('signin')}>
                Logare
              </a>
              <a className='navigation signup p-2' onClick={() => setRoute('signup')}>
                Creare cont
              </a>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>  
      :
      <Navbar expand="lg" className='navbar-component position-fixed'>
      <Container className="container-navbar-main d-flex p-2 justify-content-between"> 
        <Navbar.Brand className='p-2'>          
          <img className='logo' src={Logo} alt='logo' />
        </Navbar.Brand>      
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <img src={Vector} alt='vector'/>
          </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav" className="p-2">
          <Nav className="me-auto d-flex justify-content-end nav-links">
            <a className='navigation signin' onClick={() => setIsSignedIn(false)}>
              Delogare
            </a>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>  

  )
}

export default MainNavbar