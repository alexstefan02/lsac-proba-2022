import React from 'react'
import './Footer.css'
import Insta from './Insta.png'
import Twitch from './Twitch.png'
import Facebook from './Facebook.png'

const Footer = () => {
  return (
    <div className='footer'>
      <div className='social-links'>
        <a href='https://www.instagram.com/lsacbucuresti/'>
          <img className='insta' src={Insta} alt='insta' />
        </a>
        <a href='https://www.twitch.tv/lsac_bucuresti'>
          <img className='twitch' src={Twitch} alt='twitch' />
        </a>
        <a href='https://www.facebook.com/LsacBucuresti/'>
          <img className='facebook' src={Facebook} alt='fb' />
        </a>
      </div>
      <p className='copyright'>
        Copyright 2022 | La muncă, nu la întins mâna.
      </p>
    </div>
  )
}

export default Footer