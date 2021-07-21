import React, { useEffect, useState } from 'react'
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap'

import axios from 'axios'
import locations from '../../list_location.json'
function CreateComponent(){
    const [validated, setValidated] = useState(false)

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [place, setPlace] = useState('')

    const handleCreate = (event) => {
        const form = event.currentTarget;
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            }else{
                event.preventDefault();
                event.stopPropagation();

                if(password !== confirmPassword){
                    setVariant("danger")
                    setAlert('Password do not match.')
                    setIsAlertShow(true)
                }else if(password.length < 8){
                    setVariant("danger")
                    setAlert('Password must be atleast 8 characters long.')
                    setIsAlertShow(true)
                }else{
                    axios.post('http://localhost:8000/users/create-account/', {
                        username: email,
                        first_name: firstName,
                        last_name: lastName,
                        password: password,
                        place: place   
                    }).then(response => {
                        setPlace(locations[0])
                        setPassword('')
                        setConfirmPassword('')
                        setEmail('')
                        setLastName('')
                        setFirstName('')

                        setVariant("success")
                        setAlert('You have successfully created an account..')
                        setIsAlertShow(true)
                        
    
                    }).catch(error => {
                        setVariant("danger")
                        setAlert('User with this email already exists.')
                        setIsAlertShow(true)
                    })
                }
            }
        setValidated(true);
    }

    useEffect(() => {
        setPlace(locations[0])
    }, [])

    const [alert, setAlert] = useState('')
    const [isAlertShow, setIsAlertShow] = useState(false)
    const [variant, setVariant] = useState('danger')

    return (
        <React.Fragment>
            <Container className="mt-4">
            <h3 className="featurette-heading font-weight-bold">Bayanihan News Registration.</h3>
            <span className="lead text-muted">Create an authorize account.</span>

            {isAlertShow === true ?  <Alert className="mt-3" variant={variant} onClose={() => setIsAlertShow(false)} dismissible>{alert}</Alert> : null
            }

            <Form className="mt-3" noValidate validated={validated} onSubmit={handleCreate}>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Control 
                                type="email" 
                                placeholder="Enter email" 
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                required
                            />
                            <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <select className="form-control" onChange={(event) => setPlace(event.target.value)} required>
                            {locations.map((location, index) => {
                                return (
                                    <option key={index} value={location}>{location}</option>
                                )
                            })}
                        </select>
                        </Form.Group>
                    </Col>
                </Row>
            
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Control 
                                type="text" 
                                placeholder="Enter First Name"
                                value={firstName}
                                onChange={(event) => setFirstName(event.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Control 
                                type="text" 
                                placeholder="Enter Last Name" 
                                value={lastName}
                                onChange={(event) => setLastName(event.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>
                
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Control 
                                type="password" 
                                placeholder="Password" 
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Control
                                type="password"
                                placeholder="Confirm Password" 
                                value={confirmPassword}
                                onChange={(event) => setConfirmPassword(event.target.value)}
                                required
                              />
                        </Form.Group>
                    </Col>
                </Row>

                <Button style={{
                            background: '#E16D7A',
                            borderColor: '#E16D7A'
                        }} block size="lg" variant="primary" type="submit">
                    Create Account
                </Button>
            </Form>
            </Container>
        </React.Fragment>
    )
}

export default CreateComponent