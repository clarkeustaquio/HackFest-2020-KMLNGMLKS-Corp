import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import axios from 'axios'
import { remote } from '../../../domain'

function DeleteComponent({ phone_number, old_location, setDeletePhone, setListNumber }){
    const token = localStorage.getItem('token')
    const [validated, setValidated] = useState(false)

    const handleDeleteSubscriber = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();

            setValidated(true);
        }else{
            event.preventDefault();
            event.stopPropagation();
            
            axios.post(`${remote}users/delete-subscriber/`, {
                phone_number: phone_number,
                location: old_location,
            
            }, {
                headers: {
                    'Authorization': 'Token ' + token
                }
                
            }).then(response => {
                if(response.status === 200){
                    setListNumber(response.data.list_numbers)
                    setDeletePhone(false)
                }
            }).catch(error => {
                throw new Error('Server Refused. Try again later.')
            })

            setValidated(false);
        }
    }

    return (
        <React.Fragment>
            <Form noValidate validated={validated} onSubmit={handleDeleteSubscriber}>
                <Form.Group className="mb-3">
                    <Form.Control value={phone_number} type="text" disabled />
                </Form.Group>
                
                <Form.Group className="mb-3">
                    <Form.Control value={old_location} type="text" disabled />
                </Form.Group>
   
                <div className="mt-3">
                    <Button 
                        style={{
                            background: '#E16D7A',
                            borderColor: '#E16D7A'
                        }} 
                        className="float-right ml-2" variant="primary" type="submit">
                        Submit
                    </Button>
                    <Button 
                        style={{
                            background: '#4D74C2',
                            borderColor: '#4D74C2'
                        }}
                        className="float-right" variant="primary" onClick={() => setDeletePhone(false)}>
                        Close
                    </Button>
                </div>
            </Form>
        </React.Fragment>
    )
}

export default DeleteComponent