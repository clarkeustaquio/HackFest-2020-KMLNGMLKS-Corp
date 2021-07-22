import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import firebaseConfig from '../../firebaseConfig'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import CardLocationComponent from './Card_Location_Component'
import BreadCrumbComponent from './BreadCrumb_Component'
import StepperComponent from '../../components/stepper_component/Stepper_Component'
import SuccessComponent from './Success_Component'

import { LinearProgress } from '@material-ui/core';
import loading_news from '../../static/images/loading_news.png'
import phone1 from '../../static/images/phone1.png'

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [{ 
    provider: firebaseConfig.auth.PhoneAuthProvider.PROVIDER_ID, 
    defaultCountry: "PH", 
    whitelistedCountries: ['PH', '+63']
  }],
  tosUrl: "http://localhost:3000/",
  callbacks: {
    signInSuccessWithAuthResult: () => {
      return false
    }
  },
}

function getSteps() {
  return ['Verify phone number', 'Add location',];
}

function SubscribeComponent() {

    const [isVerified, setIsVerified] = useState(false)
    const [phoneNumber, setPhoneNumber] = useState('')
    const [isSuccess, setIsSuccess] = useState(false)
    const [userID, setUserID] = useState('')

    const [isWait, setIsWait] = useState(false)

    useEffect(() => {
      document.title = 'Subscribe'
    })

    useEffect(() => {
        const wait = setTimeout(() => {
          setIsWait(true)
        }, 3000)

        return () => {
          clearTimeout(wait)
        }
    }, [])

    const auth = firebaseConfig.auth()

    return (
        <React.Fragment>
          
            <Container className="mt-5">
              {isSuccess 
                ? 
                  <SuccessComponent />
                :
                <div>
                  <BreadCrumbComponent />
                  <StepperComponent 
                  phoneNumber={phoneNumber} 
                  setPhoneNumber={setPhoneNumber} 
                  isVerified={isVerified}
                  setIsVerified={setIsVerified}
                  getSteps={getSteps} 
                  setUserID={setUserID}
                />
                  {isVerified 
                    ? 
                      <CardLocationComponent phoneNumber={phoneNumber} setIsSuccess={setIsSuccess} userID={userID}/>
                    : <div>
                      {isWait === true ? <div>
                        <Row>
                          <Col>
                            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth}/> 
                          </Col>
                          <Col>
                          <img src={phone1} className="bd-placeholder-img" width="400" height="400" alt="Phone"></img>
                          </Col>
                        </Row>
                      </div>: <div className="text-center">
                        <img src={loading_news} className="bd-placeholder-img" width="500" height="500" alt="News"></img>
                        <LinearProgress />
                      </div>}
                    </div>
                  }
                </div>
              }
            </Container>
        </React.Fragment>
    )
}

export default SubscribeComponent