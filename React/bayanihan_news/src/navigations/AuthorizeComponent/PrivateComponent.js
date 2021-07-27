import React, { useEffect, useState } from 'react'
import { Button, Form, Alert, Row, Col } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import TableComponent from './TableComponent/TableComponent'
import axios from 'axios'
import { CircularProgress, LinearProgress } from '@material-ui/core'
import { remote } from '../../domain'

import loading_news from '../../static/images/loading_news.png'

function PrivateComponent({ isPhone }){
    const history = useHistory()
    const token = localStorage.getItem('token')
    const name = localStorage.getItem('last_name') + ', ' + localStorage.getItem('first_name')

    const [isMount, setIsMount] = useState(true)
    const [listNumber, setListNumber] = useState([])
    const [place, setPlace] = useState('')

    const [sendMessage, setSendMessage] = useState('')
    const [isSending, setIsSending] = useState(false)
    const [prompt, setPrompt] = useState('')
    const [fail, setFail] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [validated, setValidated] = useState(false)

    const [checkAuthorize, setCheckAuthorize] = useState(false)

    const handleLogout = () => {
        localStorage.clear()
        history.push('/')
    }

    useEffect(() => {
        if(token){
            axios.get(`${remote}users/authorize-token/`, {
                headers: {
                    'Authorization': 'Token ' + token
                }
            }).then(response => {
                if(response.status === 200){
                    setCheckAuthorize(true)
                }else{
                    localStorage.clear()
                    history.push('/')
                }
            }).catch(() => {
                localStorage.clear()
                history.push('/')
            })
        }

        return () => {
            setCheckAuthorize(false)
        }
    }, [history, token])

    useEffect(() => {
        if(checkAuthorize === true){
            const abort = new AbortController();
            Promise.all([
                axios.get(`${remote}users/get-people/`, {
                    headers: {
                        'Authorization': 'Token ' + token
                    }
                }).then(response => {
                    if(response.status === 200){
                        setPlace(response.data.place)
                        setListNumber(response.data.list_numbers)
                        setIsMount(false)
                    }
                })
            ]).then(() => {
                setIsMount(false)
            }).catch(() => {
                setIsMount(true)
            })

            return () => {
                abort.abort()
            }
        }
        
        return () => {
            setPlace('')
            setListNumber([])
            setIsMount(true)
        }
    }, [token, checkAuthorize])

    const handleAnnouncement = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
        }else{
            event.preventDefault();
            event.stopPropagation();
            setIsSending(true)

            axios.post(`${remote}users/send-announcement/`, {
                'announcement': sendMessage
            }, {
                headers: {
                    'Authorization': 'Token ' + token
                }
            }).then(response => {
                if(response.status === 200){
                    setPrompt(response.data.status)
                    setFail(false)
                    setSendMessage('')
                    setIsSuccess(true)
                    setValidated(false)
                    setIsSending(false)
                }
            }).catch(error => {
                setPrompt('Server Refused Try again later.')
                setIsSuccess(true)
                setFail(true)
            })
        }
    }
    return (
        <React.Fragment>
            {isPhone === false ? <h5 className="mb-3">{name.toUpperCase()} - {place}</h5>
            : <h6 className="mb-3">{name.toUpperCase()} - {place}</h6>
            }
            {isPhone === false ? <Button 
                style={{
                    background: '#E16D7A',
                    borderColor: '#E16D7A'
                }}
                className="float-right mt-n5" variant="primary" onClick={handleLogout}>Logout</Button>
            : <Button 
                style={{
                    background: '#E16D7A',
                    borderColor: '#E16D7A'
                }}
                variant="primary" block onClick={handleLogout}>Logout</Button>
            }
            

            <hr />
            {isSuccess === true ? <Alert variant={fail === true ? "danger" : "success"} onClose={() => setIsSuccess(false)} dismissible>
               {prompt}
            </Alert> : null
            }
            
            <Form noValidate validated={validated} onSubmit={handleAnnouncement}>
                <Form.Group className="mb-3">
                    <Form.Label>Write Announcement</Form.Label>
                    <Form.Control 
                        value={sendMessage} 
                        onChange={(event) => setSendMessage(event.target.value)} 
                        as="textarea" 
                        rows={3} 
                        required
                    />
                </Form.Group>
                <Row>
                    <Col>
                        <Button 
                            style={isSending === false ? { 
                                background: '#4D74C2',
                                borderColor: '#4D74C2'
                            } : { 
                                background: '#E16D7A',
                                borderColor: '#E16D7A'
                            }}
                            className="float-right" variant="primary" type="submit" disabled={isSending === false ? false : true}>
                            {isSending === false ? "Send Announcement" : <div><span className="mr-2">Sending</span> <CircularProgress size={15}/></div>}
                        </Button>
                    </Col>
                </Row>
            </Form>
            <hr />
            {isMount === false ? <TableComponent table_data={listNumber} isMount={isMount} setListNumber={setListNumber} isPhone={isPhone} />
            : <div className="text-center">
                <img src={loading_news} className="bd-placeholder-img" width={isPhone === false ? "500" : "300"} height={isPhone === false ? "500" : "300"} alt="News"></img>
                <LinearProgress />
            </div>
            }
            
        </React.Fragment>
    )
}

export default PrivateComponent