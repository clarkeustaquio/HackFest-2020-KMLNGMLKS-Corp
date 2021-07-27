import React from 'react'
import { Container, Modal, Row, Col, Card, Form } from 'react-bootstrap'
// import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import firebaseConfig from '../../firebaseConfig'
import { Link } from 'react-router-dom'

import locations from  '../../list_location.json'
import phone_loc from '../../static/images/phone_loc.png'
import 'bootstrap/dist/css/bootstrap.min.css';

const useStyles = makeStyles((theme) => ({
    // formControl: {
    //   margin: theme.spacing(1),
    //   minWidth: 300,
    // },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    root: {
        maxWidth: 345,
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


function CardLocationComponent({ phoneNumber, setIsSuccess, userID }){
    const classes = useStyles();
    const [location, setLocation] = React.useState('');
    const [isDisabled, setIsDisabled] = React.useState(false)
    const [show, setShow] = React.useState(false)

    const handleClose = () => {
        setShow(false)
        firebaseConfig.auth().signOut()
    }

    const handleChange = (event) => {
        setLocation(event.target.value);
    };

    const handleSubscribe = () => {
        const db = firebaseConfig.firestore()
        const userRef = db.collection('Subscribers').doc(userID)

        userRef.get()
        .then((docSnapshot) => {
            if (docSnapshot.exists) {
                userRef.onSnapshot((doc) => {
                setShow(true)
                // setIsDisabled(true)
            });
            } else {
                db.collection('Subscribers').doc(userID).set({
                    'phoneNumber': phoneNumber,
                    'location': location,
                }).then(() => {
                    firebaseConfig.auth().signOut()
                }).catch((error) => {
                    console.log('Subscribe Failed')
                })
        
                const requestSMS = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({title: 'Subscribe', phoneNumber: phoneNumber})
                }

                fetch('https://bayanihan-news.herokuapp.com/api/send-sms/', requestSMS)
                    .then((response) => {
                        return response.json()
                    }).then(() => {
                        setIsSuccess(true)
                        setIsDisabled(true)
                    })
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
                <Modal.Body>Sorry the number you are using was already subscribed in our service.</Modal.Body>
                <Modal.Footer>
                <Link to='/' style={{ textDecoration: "none"}}>
                    <Button variant="text" onClick={handleClose}>
                        Close
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
                            <Card.Title>Select Location</Card.Title>
                            <Card.Subtitle className="mb-2 mt-3 text-muted">Location</Card.Subtitle>
                            <Card.Text>
                                <select
                                    className="form-control"
                                    value={location}
                                    onChange={handleChange}
                                >
                                    {locations.map((location, index) => {
                                        return (
                                            <option key={index} value={location}>{location}</option>
                                        )
                                    })}
                                </select>
                            </Card.Text>
                            <Link to='/' onClick={handleCancel}>
                                <Button style={{
                                            background: '#4D74C2',
                                            borderColor: '#4D74C2'
                                        }} disabled={false} size="large" variant="contained" color="primary" className="mt-2 mr-2">
                                    Cancel
                                </Button>
                            </Link>
                            <Button style={location.length > 1 ? {
                                    background: '#E16D7A',
                                    borderColor: '#E16D7A'
                                } : null } size="large" disabled={location.length > 1 ? isDisabled : !isDisabled} variant="contained" color="primary" className="mt-2 ml-2" onClick={handleSubscribe}>
                                Subscribe
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    </React.Fragment>
    )
}

export default CardLocationComponent