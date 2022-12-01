import React from 'react'
import './Register.css'

import CloseButton from './Vector.png'
import Logo from './Logo.png'

const Register = ({setRoute, setIsSignedIn}) => {
  return (
    <div className='container-login'>
      <div className='navbar-login'>
        <img className='logo-signin' src={Logo} alt='logo' />
        <img className='close-signin' src={CloseButton} alt='close' onClick={() => setRoute('home')}/>
      </div>
      <div className='body'>
        <div className='main'>
          <h3 className='header'>
            Welcome
          </h3>
          <p className='label username'>
            Username
          </p>
          <input className='input' type='text' placeholder='username' />
          <p className='label email'>
            Email
          </p>
          <input className='input' type='text' placeholder='email' />
          <p className='label password'>
            Parolă
          </p>
          <input className='input' type='text' placeholder='parolă' />
          <button className='registerBtn' 
                  onClick={() => 
                  {
                    setRoute('home');
                    setIsSignedIn(true);
                  }}
                  >
                  Creare cont
          </button>
        </div>
      </div>
    </div>
  )
}

export default Register