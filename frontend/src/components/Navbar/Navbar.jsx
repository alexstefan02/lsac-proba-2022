import React from 'react'
import './Navbar.css'
import Logo from './Logo.png'
import Vector from './Vector.png'

const Navbar = ({setRoute, isSignedIn, setIsSignedIn, setIsPhoneWidth}) => {
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
          <img className='vector' src={Vector} alt='vector' />
        </div>
      </div> :
      <div className='navbar'>
      <img className='logo' src={Logo} alt='logo' />
      <div className='nav-links'>
        <a className='navigation signin' onClick={() => setIsSignedIn(false)}>
          Delogare
        </a>
        <img className='vector' src={Vector} alt='vector' onClick={setIsPhoneWidth(true)}/>
      </div>
    </div>
  )
}

export default Navbar