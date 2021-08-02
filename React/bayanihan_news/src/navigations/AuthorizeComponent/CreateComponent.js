import React, { useEffect, useState } from 'react'
import { Container, Form, Button, Alert } from 'react-bootstrap'

import axios from 'axios'
import locations from '../../list_location.json'
import { remote } from '../../domain'
import { CircularProgress } from '@material-ui/core'

function CreateComponent({ isPhone }){
    const [validated, setValidated] = useState(false)

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [place, setPlace] = useState('')
    const [isSubmit, setIsSubmit] = useState(false)

    // phone number, picture

    const handleCreate = (event) => {
        setIsSubmit(true)
        const form = event.currentTarget;   

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
            setIsSubmit(false)
        }else{
            event.preventDefault();
            event.stopPropagation();

            if(file !== null){
                const formData = new FormData()

                console.log(file[0])
                if(password !== confirmPassword){
                    setVariant("danger")
                    setAlert('Password do not match.')
                    setIsAlertShow(true)
                    setIsSubmit(false)
                }else if(password.length < 8){
                    setVariant("danger")
                    setAlert('Password must be atleast 8 characters long.')
                    setIsAlertShow(true)
                    setIsSubmit(false)
                }else{
                    formData.append('valid_id', file[0]) 
                    formData.append('username', email)
                    formData.append('first_name', firstName)
                    formData.append('last_name', lastName)
                    formData.append('password', password)
                    formData.append('place', place)
                    
                    axios.post(`${remote}/users/create-account/`, formData).then(response => {
                        setPlace(locations[0])
                        setPassword('')
                        setConfirmPassword('')
                        setEmail('')
                        setLastName('')
                        setFirstName('')
    
                        setVariant("success")
                        setAlert('You have successfully created an account..')
                        setIsAlertShow(true)
                        
                        setValidated(false)
                        setIsSubmit(false)
                    }).catch(error => {
                        setVariant("danger")
                        setAlert('User with this email already exists.')
                        setIsAlertShow(true)
                        setIsSubmit(false)
                    })
                }
            }else{
                setVariant("danger")
                setAlert('Choose a correct image type.')
                setIsAlertShow(true)
                setIsSubmit(false)
            }            
        }
    }

    useEffect(() => {
        setPlace(locations[0])

        return () => {
            setPlace('')
        }
    }, [])

    const [alert, setAlert] = useState('')
    const [isAlertShow, setIsAlertShow] = useState(false)
    const [variant, setVariant] = useState('danger')

    const [file, setFile] = useState(null);
    const handleFile = (file) => {
        setFile(file);
    };

    return (
        <React.Fragment>
            <Container className="mt-4">
            <h3 className="featurette-heading font-weight-bold"><span style={{ color: '#4D74C2' }}>Bayanihan</span> <span style={{ color: '#E16D7A' }}>News </span>Registration.</h3>
            <span className="lead text-muted">Create an authorize account.</span>

            {isAlertShow === true ?  <Alert className="mt-3" variant={variant} onClose={() => setIsAlertShow(false)} dismissible>{alert}</Alert> : null
            }
                
            <Form className="mt-3" noValidate validated={validated} onSubmit={handleCreate}>
                <Form.Group className="mb-3">
                    <Form.Control 
                        type="email" 
                        placeholder="Enter Email" 
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <div className={isPhone === false ? "row" : null}>
                    <div className={isPhone === false ? "col" : null}>
                        <div className="custom-file">
                            <input 
                                accept="image/*" 
                                type="file" 
                                className="custom-file-input" 
                                id="customFile"
                                onClick={(event) => (event.target.value = null)}
                                onChange={(event) => handleFile(event.target.files)}
                                required
                            />
                            <label className="custom-file-label">{file !== null ? file[0].name.toString() : 'Choose Valid ID'}</label>
                        </div>
                    </div>
                    <div className={isPhone === false ? "col" : "mt-3"}>
                        <Form.Group className="mb-3">
                            <select className="form-control" onChange={(event) => setPlace(event.target.value)} required>
                            {locations.map((location, index) => {
                                return (
                                    <option key={index} value={location}>{location}</option>
                                )
                            })}
                        </select>
                        </Form.Group>
                    </div>
                </div>
                
                <div className={isPhone === false ? "row" : null}>
                    <div className={isPhone === false ? "col" : "mt-3"}>
                        <Form.Group className="mb-3">
                            <Form.Control 
                                type="text" 
                                placeholder="Enter First Name"
                                value={firstName}
                                onChange={(event) => setFirstName(event.target.value.toUpperCase())}
                                required
                            />
                        </Form.Group>
                    </div>
                    <div className={isPhone === false ? "col" : "mt-3"}>
                        <Form.Group className="mb-3">
                            <Form.Control 
                                type="text" 
                                placeholder="Enter Last Name" 
                                value={lastName}
                                onChange={(event) => setLastName(event.target.value.toUpperCase())}
                                required
                            />
                        </Form.Group>
                    </div>
                </div>

                <div className={isPhone === false ? "row" : null}>
                    <div className={isPhone === false ? "col" : "mt-3"}>
                        <Form.Group className="mb-3">
                            <Form.Control 
                                type="password" 
                                placeholder="Password" 
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                required
                            />
                        </Form.Group>
                    </div>
                    <div className={isPhone === false ? "col" : "mt-3"}>
                        <Form.Group className="mb-3">
                            <Form.Control
                                type="password"
                                placeholder="Confirm Password" 
                                value={confirmPassword}
                                onChange={(event) => setConfirmPassword(event.target.value)}
                                required
                              />
                        </Form.Group>
                    </div>
                </div>

                <Button style={{
                            background: '#E16D7A',
                            borderColor: '#E16D7A'
                        }} block size="lg" variant="primary" type="submit">
                    {isSubmit === true ? <CircularProgress size={25} /> : "Create Account" }
                </Button>
            </Form>
            </Container>
        </React.Fragment>
    )
}

export default CreateComponent