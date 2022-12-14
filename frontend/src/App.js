import React, {useState} from 'react'
import MainNavbar from './components/Navbar/Navbar';
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
  const [isPhoneWidth, setIsPhoneWidth] = useState(false);

  return (
    <div>
      {
        route !== 'home' ?
          <div>
            <div className='content active'>
              <MainNavbar setRoute={setRoute} isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} setIsPhoneWidth={setIsPhoneWidth}/>
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
            <MainNavbar setRoute={setRoute} isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} setIsPhoneWidth={setIsPhoneWidth}/>
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
