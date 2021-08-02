import React from 'react'
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { makeStyles } from '@material-ui/core/styles';

import firebaseConfig from '../../firebaseConfig'

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
}));



function StepperComponent({ setPhoneNumber, isVerified, setIsVerified, getSteps, setUserID }){
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();
  
    const handleNext = (phoneNumber, uid) => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setIsVerified(true)
      setPhoneNumber(phoneNumber)
      setUserID(uid)
    };
    
    firebaseConfig.auth().onAuthStateChanged(function(user){
        if(user){
          if(!isVerified){
            handleNext(user.phoneNumber, user.uid)
          }
        }
    })

    return (
      <div className={classes.root}>
            <div className={classes.root}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </div>
      </div>
    )
  }

  export default StepperComponent