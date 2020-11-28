import React from 'react'
import { Container } from 'react-bootstrap'

import firebaseConfig from '../../firebaseConfig'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import CardLocationComponent from './Card_Location_Component'
import BreadCrumbComponent from './BreadCrumb_Component'
import StepperComponent from '../../components/stepper_component/Stepper_Component'
import SuccessComponent from './Success_Component'

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [firebaseConfig.auth.PhoneAuthProvider.PROVIDER_ID],
  tosUrl: "http://localhost:3000/",
  callbacks: {
    signInSuccessWithAuthResult: () => {
      return false
    }
  }
}

function getSteps() {
  return ['Verify phone number', 'Add location',];
}

function SubscribeComponent() {

    const [isVerified, setIsVerified] = React.useState(false)
    const [phoneNumber, setPhoneNumber] = React.useState('')
    const [isSuccess, setIsSuccess] = React.useState(false)
    const [userID, setUserID] = React.useState('')

    React.useEffect(() => {
      document.title = 'Subscribe'
    })
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
                    :
                      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebaseConfig.auth()}/>
                  }
                </div>
              }
            </Container>
        </React.Fragment>
    )
}

export default SubscribeComponent