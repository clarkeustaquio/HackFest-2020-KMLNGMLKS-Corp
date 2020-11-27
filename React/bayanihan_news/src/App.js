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
            <AboutNavigation />
          </Route>
          <Route path="/contact">
            <ContactNavigation />
          </Route>
          {/* <Route path='/admin'>
            <AdminComponent />
          </Route>
          <Route path='/admin-panel'>
            <AdminDisplayComponent />
          </Route> */}
        </Switch>
      </Router>
    </React.Fragment>
  )
}

function IndexNavigation({ isPhone }){
  return (
    <React.Fragment>
      <NavbarComponent />
      <HeroComponent isPhone={isPhone}/>
      <DailyNews isPhone={isPhone}/>
      <FooterComponent />
    </React.Fragment>
  )
}
function SubscribeNavigation(){
  return (
    <React.Fragment>
      <NavbarComponent />
      <SubscribeComponent />
      <FooterComponent />
    </React.Fragment>
  )
}
function UnsubscribeNavigation(){
  return (
    <React.Fragment>
      <NavbarComponent />
      <UnsubscribeComponent />
      <FooterComponent />
    </React.Fragment>
  )
}
function AboutNavigation(){
  return (
    <React.Fragment>
      <NavbarComponent />
      <AboutComponent />
      <FooterComponent />
    </React.Fragment>
  )
}
function ContactNavigation(){
  return (
    <React.Fragment>
      <NavbarComponent />
      <ContactComponent />
      <FooterComponent />
    </React.Fragment>
  )
}
// function YesterdayNavigation(){
//   return (
//     <React.Fragment>
//       <NavbarComponent />
//       <YesterdayNewsComponent />
//       <FooterComponent />
//     </React.Fragment>
//   )
// }
export default App