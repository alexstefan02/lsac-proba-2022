import React from 'react'
import './Login.css'

import CloseButton from './Vector.png'
import Logo from './Logo.png'

const Login = ({setRoute, setIsSignedIn}) => {
  return (
    <div className='container-login'>
      <div className='navbar-login'>
        <img className='logo-signin' src={Logo} alt='logo' />
        <img className='close-signin' src={CloseButton} alt='close' onClick={() => setRoute('home')}/>
      </div>
      <div className='body'>
        <div className='main'>
          <h3 className='header'>
            Welcome back
          </h3>
          <div className='username-section'>
            <p className='label username'>
              Username
            </p>
            <input className='input' type='text' placeholder='username' />
          </div>
          <div className='password-section'>
            <p className='label password'>
              Parolă
            </p>
            <input className='input' type='text' placeholder='parolă' />
          </div>
          <button className='loginBtn' 
                  onClick={() => 
                  {
                    setRoute('home');
                    setIsSignedIn(true);
                  }}
                  >
                  Logare
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login