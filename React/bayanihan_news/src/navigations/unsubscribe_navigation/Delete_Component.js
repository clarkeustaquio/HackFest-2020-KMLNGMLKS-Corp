import React from 'react'
import { Container, Modal, Row, Col, Card } from 'react-bootstrap'
// import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import firebaseConfig from '../../firebaseConfig'

import { Link } from 'react-router-dom'

function DeleteComponent({ phoneNumber, setIsSuccess, userID }){
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
                <Row>
                    <Col className="mt-5">
                        <Card>
                            <Card.Body>
                                <Card.Title>Phone Subscription</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Unsubscribe</Card.Subtitle>
                                <Card.Text>
                                    Are you sure you want to unsubscribe?
                                </Card.Text>
                                <Link to='/' onClick={handleCancel}>
                                    <Button style={{
                                        background: '#4D74C2',
                                        borderColor: '#4D74C2'
                                    }} disabled={false} variant="contained" size="large" color="primary" className="mt-2 mb-3 mr-2">
                                        Cancel
                                    </Button>
                                </Link>
                                <Button style={{
                                        background: '#E16D7A',
                                        borderColor: '#E16D7A'
                                    }}  disabled={isDisabled} variant="contained" color="primary" size="large" className="mt-2 mb-3 ml-2" onClick={handleUnsubscribe}>
                                    Unsubscribe
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default DeleteComponent