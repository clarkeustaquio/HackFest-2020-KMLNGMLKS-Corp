import React, { useState } from 'react';
import DailyNews from './components/daily_news_component/Daily_News_Component';
import HeroComponent from './components/hero_component/Hero_Component';
import NavbarComponent from './components/navbar_component/Navbar_Component';
import FooterComponent from './components/footer_component/Footer_Component';
import SubscribeComponent from './navigations/subscribe_navigation/Subscribe_Component';
import AboutComponent from './navigations/about_us_navigation/About_Component'
import ContactComponent from './navigations/contact_us_navigation/Contact_Component'
import AuthorizeComponent from './navigations/AuthorizeComponent/AuthorizeComponent';
import UnsubscribeComponent from './navigations/unsubscribe_navigation/Unsubscribe_Component'

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import news_hero_image from './static/images/news_hero_image.jpg'
import farmers from './static/images/farmers.jpg'
import contact_us from './static/images/contact_us.jpg'

import './App.css'

function App(){
  const [size, setSize] = useState(window.innerWidth)
  const [isPhone, setIsPhone] = useState(false)
  
  const changeSize = () => {
      setSize(window.innerWidth)
  }

  React.useEffect(() => {
      window.addEventListener('resize', changeSize)

      if(size < 576) setIsPhone(true)
      else setIsPhone(false)

      return () => {
          window.removeEventListener('resize', changeSize)
      }
  }, [size])

  return (
    <React.Fragment>
      <div>
        <Router>
          <Switch>
            <Route exact path="/">
              <IndexNavigation isPhone={isPhone} />
            </Route>
            <Route path="/subscribe">
              <SubscribeNavigation isPhone={isPhone} />
            </Route>
            <Route path="/unsubscribe">
              <UnsubscribeNavigation isPhone={isPhone} />
            </Route>
            <Route path="/about">
              <AboutNavigation isPhone={isPhone} />
            </Route>
            <Route path="/contact">
              <ContactNavigation isPhone={isPhone}/>
            </Route>
            <Route path="/authorize">
              <AuthorizeNavigation isPhone={isPhone}/>
            </Route>
          </Switch>
        </Router>
      </div>

    </React.Fragment>
  )
}

function IndexNavigation({ isPhone }){
  return (
    <React.Fragment>
      <div id="root">
        <NavbarComponent />
        <HeroComponent isPhone={isPhone} hero_image={news_hero_image}/>
        <DailyNews isPhone={isPhone}/>
      </div>
      <FooterComponent isPhone={isPhone}/>
    </React.Fragment>
  )
}
function SubscribeNavigation({ isPhone }){
  return (
    <React.Fragment>
      <div id="root">
        <NavbarComponent />
        <SubscribeComponent />
      </div>
      <FooterComponent isPhone={isPhone}/>
    </React.Fragment>
  )
}
function UnsubscribeNavigation({ isPhone }){
  return (
    <React.Fragment>
      <div id="root">
        <NavbarComponent />
        <UnsubscribeComponent />
      </div>
      <FooterComponent isPhone={isPhone}/>
    </React.Fragment>
  )
}
function AboutNavigation({ isPhone }){
  return (
    <React.Fragment>
      <div id="root">
      <NavbarComponent />
      <HeroComponent isPhone={isPhone} hero_image={farmers}/>
      <AboutComponent isPhone={isPhone}/>
      </div>
      <FooterComponent isPhone={isPhone}/>
    </React.Fragment>
  )
}
function ContactNavigation({ isPhone }){
  return (
    <React.Fragment>
      <div id="root">
        <NavbarComponent />
        <HeroComponent isPhone={isPhone} hero_image={contact_us}/>
        <ContactComponent />
      </div>
      <FooterComponent isPhone={isPhone}/>
    </React.Fragment>
  )
}
function AuthorizeNavigation({ isPhone }){
  return (
    <React.Fragment>
      <div id="root">
        <NavbarComponent />
        <AuthorizeComponent isPhone={isPhone} />
      </div>
      <FooterComponent isPhone={isPhone}/>
    </React.Fragment>
  )
}

export default App