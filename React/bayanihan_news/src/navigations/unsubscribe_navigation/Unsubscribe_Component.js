import React from 'react'
import { Container } from 'react-bootstrap'

import firebaseConfig from '../../firebaseConfig'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import BreadCrumbComponent from '../subscribe_navigation/BreadCrumb_Component'
import StepperComponent from '../../components/stepper_component/Stepper_Component'

import DeleteComponent from './Delete_Component'
import UnsubscribeSuccessComponent from './Unsubscribe_Success_Component'

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

function UnsubscribeComponent() {
    const [isVerified, setIsVerified] = React.useState(false)
    const [phoneNumber, setPhoneNumber] = React.useState('')
    const [isSuccess, setIsSuccess] = React.useState(false)
    const [userID, setUserID] = React.useState('')

    React.useEffect(() => {
      document.title = 'Unsubscribe'
    })

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