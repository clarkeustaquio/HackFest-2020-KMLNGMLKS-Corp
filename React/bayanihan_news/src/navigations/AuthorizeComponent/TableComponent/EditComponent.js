import React, { useState, useEffect } from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/bootstrap.css'
import { Button, Form, Alert } from 'react-bootstrap'
import locations from '../../../list_location.json'
import axios from 'axios'

function EditComponent({ phone_number, old_location, setEdit, setListNumber }){
    const token = localStorage.getItem('token')
    const [validated, setValidated] = useState(false)
    const [phone, setPhone] = useState(phone_number)
    const [location, setLocation] = useState(old_location)

    const handleAddSubscriber = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
        }else{
            event.preventDefault();
            event.stopPropagation();
            
            axios.post('http://localhost:8000/users/edit-subscriber/', {
                old_phone_number: phone_number,
                new_phone_number: '+' + phone,
                old_location: old_location,
                location: location
            
            }, {
                headers: {
                    'Authorization': 'Token ' + token
                }
                
            }).then(response => {
                if(response.status === 200){
                    setListNumber(response.data.list_numbers)
                    setEdit(false)
                }
            }).catch(error => {
                setAlert(true)
            })

            setValidated(false);
        }
    }

    useEffect(() => {
        setLocation(locations[0])
    }, [])

    const [alert, setAlert] = useState(false)

    return (
        <React.Fragment>
            {alert === true ? <Alert variant="danger" onClose={() => setAlert(false)} dismissible>
                This number is already exist!
            </Alert> : null
            }
            <Form noValidate validated={validated} onSubmit={handleAddSubscriber}>
                <PhoneInput
                    country={'ph'}
                    value={phone}
                    inputStyle={{ width:'100%'}}
                    onChange={phone => setPhone(phone)}
                    inputProps={{
                        required: true,
                        autoFocus: true
                    }}
                />
            
                <select className="form-control mt-3" onChange={(event) => setLocation(event.target.value)} required>
                    {locations.map((location, index) => {
                        return (
                            <option key={index} value={location}>{location}</option>
                        )
                    })}
                </select>
   
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
                        className="float-right" variant="primary" onClick={() => setEdit(false)}>
                        Close
                    </Button>
                </div>
            </Form>
        </React.Fragment>
    )
}

export default EditComponent