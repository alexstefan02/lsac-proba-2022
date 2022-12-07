import React, {useState} from 'react'
import Navbar from './components/Navbar/Navbar';
import FrontPage from './components/FrontPage/FrontPage';
import ImageUploadForm from './components/ImageUploadForm/ImageUploadForm';
import MostViewedSection from './components/MostViewedSection/MostViewedSection';
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import './App.css'

const App = () => {
  const [route, setRoute] = useState('home');
  const [isSignedIn, setIsSignedIn] = useState(false);
  return (
    <div>
      {
        route !== 'home' ?
          <div>
            <div className='content active'>
              <FrontPage />
              <ImageUploadForm />
              <MostViewedSection />
              <Footer />
            </div>
            <div className='popup'>
              {
                route === 'signin' ?
                  <Login setRoute={setRoute} setIsSignedIn={setIsSignedIn}/> :
                  <Register setRoute={setRoute} setIsSignedIn={setIsSignedIn}/>
              }
            </div>
          </div> :
          <div>
            <Navbar setRoute={setRoute} isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn}/>
            <FrontPage />
            <ImageUploadForm />
            <MostViewedSection />
            <Footer />
          </div>
      }
    </div> 
  )
}

export default App
