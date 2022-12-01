import React from 'react'
import './Navbar.css'
import Logo from './Logo.png';


const Navbar = ({setRoute, isSignedIn, setIsSignedIn}) => {
  return (
      !isSignedIn ? 
      <div className='navbar'>
        <img className='logo' src={Logo} alt='logo' />
        <div className='nav-links'>
          <a className='navigation signin' onClick={() => setRoute('signin')}>
            Logare
          </a>
          <a className='navigation signup' onClick={() => setRoute('signup')}>
            Creare cont
          </a>
        </div>
      </div> :
      <div className='navbar'>
      <img className='logo' src={Logo} alt='logo' />
      <div className='nav-links'>
        <a className='navigation signin' onClick={() => setIsSignedIn(false)}>
          Delogare
        </a>
      </div>
    </div>
  )
}

export default Navbar