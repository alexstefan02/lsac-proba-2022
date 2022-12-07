import React from 'react'
import './Register.css'

import CloseButton from './Vector.png'
import Logo from './Logo.png'

const Register = ({setRoute, setIsSignedIn}) => {
  return (
    <div className='container-signup'>
      <div className='navbar-signup'>
        <img className='logo-signup' src={Logo} alt='logo' />
        <img className='close-signup' src={CloseButton} alt='close' onClick={() => setRoute('home')}/>
      </div>
      <div className='body'>
        <div className='main'>
          <h3 className='header'>
            Welcome
          </h3>
          <div className='usernameSec'>
            <p className='label username'>
              Username
            </p>
            <input className='input' type='text' placeholder='username' /> 
          </div>
          <div className='emailSec'>
            <p className='label email'>
              Email
            </p>
            <input className='input' type='text' placeholder='email' />  
          </div>
          <div className='passwordSec'>
            <p className='label password'>
              Parolă
            </p>
            <input className='input' type='text' placeholder='parolă' />         
          </div>
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