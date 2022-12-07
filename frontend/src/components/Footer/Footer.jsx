import React from 'react'
import './Footer.css'
import Insta from './Insta.png'
import Discord from './Discord.png'
import Facebook from './Facebook.png'

const Footer = () => {
  return (
    <div className='footer'>
      <div className='social-links'>
        <img className='insta' src={Insta} alt='insta' />
        <img className='discord' src={Discord} alt='discord' />
        <img className='facebook' src={Facebook} alt='fb' />
      </div>
      <p className='copyright'>
        Copyright 2022 | La muncă, nu la întins mâna.
      </p>
    </div>
  )
}

export default Footer