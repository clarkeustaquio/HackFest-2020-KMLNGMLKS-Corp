import React from 'react'
import { Container, Alert } from 'react-bootstrap'

import firebaseConfig from '../../firebaseConfig'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import BreadCrumbComponent from '../subscribe_navigation/BreadCrumb_Component'
import StepperComponent from '../../components/stepper_component/Stepper_Component'

import DeleteComponent from './Delete_Component'

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [firebaseConfig.auth.PhoneAuthProvider.PROVIDER_ID],
  tosUrl: "http://localhost:3000/",
  callbacks: {
    signInSuccessWithAuthResult: () => {
        firebaseConfig.auth().onAuthStateChanged(function(user){
  
      })
     
      return false
    }
  }
}

function getSteps() {
    return ['Verify phone number', 'Unsubscribe number',];
}

function UnsubscribeComponent() {
    const [isVerified, setIsVerified] = React.useState(false)
    const [phoneNumber, setPhoneNumber] = React.useState('')
    const [isSuccess, setIsSuccess] = React.useState(false)
    const [userID, setUserID] = React.useState('')

    return (
        <React.Fragment>

            <Container className="mt-5">
              <BreadCrumbComponent />
              {isSuccess 
                ? 
                <div>
                  <Alert variant='success'>
                    Success
                  </Alert>
                </div>
                :
                <div>
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
                    :
                      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebaseConfig.auth()}/>
                  }
                </div>
              }
            </Container>
        </React.Fragment>
    )
}

export default UnsubscribeComponent