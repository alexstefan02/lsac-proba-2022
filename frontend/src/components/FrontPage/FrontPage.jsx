import React from 'react'
import './FrontPage.css'
import WhySoSalty from './photo-main-page.png'

const FrontPage = () => {
  return (
    <div className='front-page'>
      <div className='content-section'>
        <h2 className='head-text one top-headT'>Partajarea de meme-uri nu a</h2>
        <h2 className='head-text two one bot-headT'>fost niciodată mai simplă</h2>
        <p className='paragraph-text one'>Platforma ideală pentru studenții de la Politehnică,</p>
        <p className='paragraph-text two'>amuzați de câte materii o să pice semestrul asta.</p>
        <button className='uploadMemeBtn' 
                onClick={() => {
                  document.getElementById('image-upload-form')
                          .scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                >
                Upload a MEME
        </button>
      </div>
      <img className='salty-photo' src={WhySoSalty} alt='why-so-salty'/>
    </div>
  )
}

export default FrontPage