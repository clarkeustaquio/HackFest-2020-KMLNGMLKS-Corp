import React, { useState, useEffect } from 'react'
import { Button, Form, Alert } from 'react-bootstrap'
import axios from 'axios'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/bootstrap.css'

import locations from '../../list_location.json'

function AddSubscriberComponent({ setListNumber, setAddSubModal }){
    const token = localStorage.getItem('token')
    const [validated, setValidated] = useState(false)
    const [checkPhone, setCheckPhone] = useState(false)

    const handleAddSubscriber = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
        }else{
            event.preventDefault();
            event.stopPropagation();

            if(checkPhone === false){
                axios.post('http://localhost:8000/users/add-subscriber/', {
                    phone_number: '+' + phone,
                    location: location
                
                }, {
                    headers: {
                        'Authorization': 'Token ' + token
                    }
                    
                }).then(response => {
                    if(response.status === 200){
                        setListNumber(response.data.list_numbers)
                        setAddSubModal(false)
                    }
                }).catch(error => {
                    setAlert(true)
                })
    
                setValidated(false);
            }
        }
    }

    const [phone, setPhone] = useState('')
    const [location, setLocation] = useState('')
    
    useEffect(() => {
        setLocation(locations[0])
    }, [])

    const [alert, setAlert] = useState(false)

    const [file, setFile] = useState(null);
    const handleFile = (file) => {
        setFile(file);
    };

    const handleImport = () => {
        if (file !== null) {
            const formData = new FormData();
            formData.append('file', file[0]);            

            axios.post('http://localhost:8000/users/import-subscriber/', formData, {
                headers: {
                    'Authorization': 'Token ' + token
                }
            }).then((response) => {
                if (response.status === 200) {
                    setListNumber(response.data.list_numbers)
                    setFile(null);
                    setAddSubModal(false)
                }
            }).catch((error) => {
                throw new Error(error.response.data.status);
            });
        }
    };

    return (
        <React.Fragment>
            <div className="form-group">
            <label>Import Phone Number</label>
                <div className="custom-file">
                    <input 
                        accept=".xlsx" 
                        type="file" 
                        className="custom-file-input" 
                        id="customFile"
                        onClick={(event) => (event.target.value = null)}
                        onChange={(event) => handleFile(event.target.files)}
                    />
                    <label className="custom-file-label">{file !== null ? file[0].name.toString() : 'Choose File'}</label>
                </div>
             
                <Button
                    style={{
                            background: '#E16D7A',
                            borderColor: '#E16D7A'
                    }} 
                    className="mt-3" variant="primary" onClick={() => handleImport()} block>Import</Button>
            </div>
          
            <hr />
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
                    isValid={(value, country) => {
                        if (value.match(/6312345/)) {
                            setCheckPhone(true)
                            return 'Invalid value: '+value+', '+country.name;
                        } else if (value.match(/631234/)) {
                            setCheckPhone(true)
                            return false;
                        } else {
                            setCheckPhone(false)
                            return true;
                        }
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
                        className="float-right" variant="primary" onClick={() => setAddSubModal(false)}>
                        Close
                    </Button>
                </div>
            </Form>

        </React.Fragment>
    )
}

export default AddSubscriberComponent