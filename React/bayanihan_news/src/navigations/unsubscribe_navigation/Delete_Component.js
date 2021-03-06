import React from 'react'
import { Container, Modal } from 'react-bootstrap'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import firebaseConfig from '../../firebaseConfig'

import { Link } from 'react-router-dom'

const useStyles = makeStyles(() => ({
    root: {
        maxWidth: 345,
        justifyContent: 'center',
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    media: {
        height: 180,
    },
  }));


function DeleteComponent({ phoneNumber, setIsSuccess, userID }){
    const classes = useStyles();
    const [isDisabled, setIsDisabled] = React.useState(false)
    const [show, setShow] = React.useState(false)

    const handleClose = () => {
        setShow(false)
        firebaseConfig.auth().signOut()
    }

    const handleUnsubscribe = () => {
        const db = firebaseConfig.firestore()
        let user = firebaseConfig.auth().currentUser
        const userRef = db.collection('Subscribers').doc(userID)

        userRef.get()
        .then((docSnapshot) => {
            if (docSnapshot.exists) {
                userRef.onSnapshot((doc) => {
                    user.delete().catch((error) => {
                        console.log('Unsubscribe')
                    })
                    db.collection('Subscribers').doc(userID).delete().catch((error) => {
                        console.log('Unsubscribe')
                    })
            
                    const requestSMS = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({title: 'Unsubscribe', phoneNumber: phoneNumber})
                    }
            
                    fetch('https://bayanihan-news.herokuapp.com/api/send-sms/', requestSMS)
                        .then((response) => {
                            return response.json()
                        }).then(() => {
                            setIsSuccess(true)
                            setIsDisabled(true)
                        }) 
            });
            } else {
                setShow(true)
            }
        });
    }

    const handleCancel = () => {
        let user = firebaseConfig.auth().currentUser
        if(user){
            user.delete().catch((error) => {
                console.log('Failed')
            })
        }
    }

    return (
        <React.Fragment>
            {show && <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                <Modal.Title>Phone Number</Modal.Title>
                </Modal.Header>
                <Modal.Body>Sorry the number you are using is not in our service. Please subscribe.</Modal.Body>
                <Modal.Footer>
                <Link to='/' style={{ textDecoration: "none"}}>
                    <Button variant="text" onClick={handleClose}>
                        Close
                    </Button>
                </Link>
                <Link to='/subscribe' style={{ textDecoration: "none"}}>
                    <Button variant="text" onClick={handleClose}>
                        Subscribe
                    </Button>
                </Link>
                </Modal.Footer>
            </Modal>
            }
            <Container style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Card className={classes.root}>
                    <Container>
                        <CardContent >
                            <Typography className={classes.title} color="textPrimary" gutterBottom>
                                Are you sure you want to unsubscribe?
                            </Typography>
                        </CardContent>

                        <Grid container justify="center">
                            <Grid item>
                            <Link to='/' onClick={handleCancel}>
                                <Button disabled={false} variant="contained" color="primary" className="mt-4 mb-3 mr-2">
                                    Cancel
                                </Button>
                            </Link>
                            <Button disabled={isDisabled} variant="contained" color="primary" className="mt-4 mb-3 ml-2" onClick={handleUnsubscribe}>
                                Unsubscribe
                            </Button>
                            </Grid>
                        </Grid>
                    </Container>
                </Card>
            </Container>
        </React.Fragment>
    )
}

export default DeleteComponent