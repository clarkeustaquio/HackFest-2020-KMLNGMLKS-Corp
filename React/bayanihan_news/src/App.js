import React from 'react';
import DailyNews from './components/daily_news_component/Daily_News_Component';
import HeroComponent from './components/hero_component/Hero_Component';
import NavbarComponent from './components/navbar_component/Navbar_Component';
import FooterComponent from './components/footer_component/Footer_Component';
import SubscribeComponent from './navigations/subscribe_navigation/Subscribe_Component';
import AboutComponent from './navigations/about_us_navigation/About_Component'
import ContactComponent from './navigations/contact_us_navigation/Contact_Component'

// import AdminComponent from './navigations/admin_navigation/Admin_Component'
// import AdminDisplayComponent from './navigations/admin_navigation/Admin_Display_Component'
import UnsubscribeComponent from './navigations/unsubscribe_navigation/Unsubscribe_Component'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import news_hero_image from './static/images/news_hero_image.jpg'
import farmers from './static/images/farmers.jpg'
import contact_us from './static/images/contact_us.jpg'

import './App.css'

function App(){
  const [size, setSize] = React.useState(window.innerWidth)
  const [isPhone, setIsPhone] = React.useState(false)

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
      <div className="content">
        <Router>
          <Switch>
            <Route exact path="/">
              <IndexNavigation isPhone={isPhone} />
            </Route>
            <Route path="/subscribe">
              <SubscribeNavigation />
            </Route>
            <Route path="/unsubscribe">
              <UnsubscribeNavigation />
            </Route>
            <Route path="/about">
              <AboutNavigation isPhone={isPhone} />
            </Route>
            <Route path="/contact">
              <ContactNavigation isPhone={isPhone}/>
            </Route>
          </Switch>
          <FooterComponent isPhone={isPhone} className="footer-sticky"/>
        </Router>
      </div>
    </React.Fragment>
  )
}

// Intened for Admin - Workin with this spaghetti
function IndexNavigation({ isPhone }){
  return (
    <React.Fragment>
      <NavbarComponent />
      <HeroComponent isPhone={isPhone} hero_image={news_hero_image}/>
      <DailyNews isPhone={isPhone}/>
    </React.Fragment>
  )
}
function SubscribeNavigation(){
  return (
    <React.Fragment>
      <NavbarComponent />
      <SubscribeComponent />
    </React.Fragment>
  )
}
function UnsubscribeNavigation(){
  return (
    <React.Fragment>
      <NavbarComponent />
      <UnsubscribeComponent />
    </React.Fragment>
  )
}
function AboutNavigation({ isPhone }){
  return (
    <React.Fragment>
      <NavbarComponent />
      <HeroComponent isPhone={isPhone} hero_image={farmers}/>
      <AboutComponent isPhone={isPhone}/>
    </React.Fragment>
  )
}
function ContactNavigation({ isPhone }){
  return (
    <React.Fragment>
      <NavbarComponent />
      <HeroComponent isPhone={isPhone} hero_image={contact_us}/>
      <ContactComponent />
    </React.Fragment>
  )
}

export default App