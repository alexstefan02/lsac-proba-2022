import React from 'react'
import './MostViewedSection.css'
import Meme1 from './Meme1.png'
import Meme2 from './Meme2.png'
import Meme3 from './Meme3.png'

const MostViewedSection = () => {
  return (
    <div className='most-viewed-section'>
      <h3 className='header-most-viewed'>Most Viewed</h3>
      <div className='memes-list'>
        <img src={Meme1} alt='meme1' className='meme1'/>
        <img src={Meme2} alt='meme2' className='meme2'/>
        <img src={Meme3} alt='meme3' className='meme3'/>
      </div>
    </div>
  )
}

export default MostViewedSection