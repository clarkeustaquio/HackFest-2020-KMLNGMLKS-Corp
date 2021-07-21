import React, { useEffect, useState } from 'react'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'

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

                axios.post('http://localhost:8000/users/create-account/', {
                    username: email,
                    first_name: firstName,
                    last_name: lastName,
                    password: password,
                    place: place   
                }).then(response => {
                    console.log(response.data)
                }).catch(error => {
                    throw new Error('Server Refused. Try again later.')
                })
            }

            setValidated(true);
    }

    useEffect(() => {
        setPlace(locations[0])
    }, [])
    return (
        <React.Fragment>
            <Container className="mt-4">
            <h3 className="featurette-heading font-weight-bold">Bayanihan News Registration.</h3>
            <span className="lead text-muted">Create an authorize account.</span>

            <Form className="mt-3" noValidate validated={validated} onSubmit={handleCreate}>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            {/* <Form.Label>Email address</Form.Label> */}
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
                            {/* <Form.Label>Place</Form.Label> */}
                            {/* <Form.Control 
                                type="text" 
                                placeholder="Enter Place" 
                                value={place}
                                onChange={(event) => setPlace(event.target.value)}
                                required
                            /> */}
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
                            {/* <Form.Label>First Name</Form.Label> */}
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
                            {/* <Form.Label>Last Name</Form.Label> */}
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
                            {/* <Form.Label>Password</Form.Label> */}
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
                            {/* <Form.Label>Confirm Password</Form.Label> */}
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