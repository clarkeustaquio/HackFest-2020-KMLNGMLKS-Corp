import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import firebaseConfig from '../../firebaseConfig'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import BreadCrumbComponent from '../subscribe_navigation/BreadCrumb_Component'
import StepperComponent from '../../components/stepper_component/Stepper_Component'

import DeleteComponent from './Delete_Component'
import UnsubscribeSuccessComponent from './Unsubscribe_Success_Component'

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
    return ['Verify phone number', 'Unsubscribe number',];
}

function UnsubscribeComponent({ isPhone }) {
    const [isVerified, setIsVerified] = useState(false)
    const [phoneNumber, setPhoneNumber] = useState('')
    const [isSuccess, setIsSuccess] = useState(false)
    const [userID, setUserID] = useState('')
    const [isWait, setIsWait] = useState(false)

    useEffect(() => {
      document.title = 'Unsubscribe'
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
                <UnsubscribeSuccessComponent />
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
                      <DeleteComponent phoneNumber={phoneNumber} setIsSuccess={setIsSuccess} userID={userID}/>
                    : <div>
                      {isWait === true ? <div>
                        <Row>
                          <Col>
                            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth}/> 
                          </Col>
                          {/* <Col>
                          <img src={phone1} className="bd-placeholder-img" width="400" height="400" alt="Phone"></img>
                          </Col> */}
                        </Row>
                      </div>: <div className="text-center">
                          <img src={loading_news} className="bd-placeholder-img"  width={isPhone === false ? "500" : "300"} height={isPhone === false ? "500" : "300"} alt="News"></img>
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

export default UnsubscribeComponent