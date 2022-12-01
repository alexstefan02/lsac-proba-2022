import React from 'react'
import './FrontPage.css'
import WhySoSalty from './photo-main-page.png'

const FrontPage = () => {
  return (
    <div className='front-page'>
      <div className='content-section'>
        <h2 className='head-text one'>Partajarea de meme-uri nu a</h2>
        <h2 className='head-text two one'>fost niciodată mai simplă</h2>
        <p className='paragraph-text one'>Platforma ideală pentru studenții de la Politehnică,</p>
        <p className='paragraph-text two'>amuzați de câte materii o să pice semestrul asta.</p>
        <button className='uploadMemeBtn'>Upload a MEME</button>
      </div>
      <img className='salty-photo' src={WhySoSalty} alt='why-so-salty'/>
    </div>
  )
}

export default FrontPage