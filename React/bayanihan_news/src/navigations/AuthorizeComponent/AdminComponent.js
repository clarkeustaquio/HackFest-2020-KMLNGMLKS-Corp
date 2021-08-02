import React, { useEffect, useState } from 'react'
import { Table, Button, Modal, Nav, Form } from 'react-bootstrap'
import { remote } from '../../domain'
import axios from 'axios'
import UserComponent from './UserComponent/UserComponent'

import { LinearProgress } from '@material-ui/core'
import loading_news from '../../static/images/loading_news.png'

function AdminComponent({ isPhone, handleLogout }){
    const token = localStorage.getItem('token')
    const [listApprove, setListApprove] = useState([])
    const [listNumber, setListNumber] = useState([])
    const [listAnnouncement, setListAnnouncement] = useState([])
    const [isMount, setIsMount] = useState(true)
    const [isShow, setIsShow] = useState(false)
    const [url, setUrl] = useState()
    const [userID, setUserID] = useState()
    const [popText, setPopText] = useState()
    
    const tabs = ["users", "announcements", "approval"]
    const [selectTab, setSelectTab] = useState('')

    useEffect(() => {
        setSelectTab(tabs[0])
        
        return () => {
            setSelectTab([])
        }
    }, [])
    useEffect(() => {
        axios.get(`${remote}/users/get-admin-data/`, {
            headers: {
                'Authorization': 'Token ' + token
            }
        }).then(response => {
            if(response.status === 200){
                setListApprove(response.data.approval)
                setListNumber(response.data.list_numbers)
                setListAnnouncement(response.data.announcements)
                setIsMount(false)
            }
        }).catch(() => {
            throw new Error('Server Refused. Try again later.')
        })

        return () => {
            setListApprove([])
            setListNumber([])
            setListAnnouncement([])
        }
    }, [token])

    const changeUrl = (user_id, action) => {
        setUserID(user_id)
        setUrl(action)
    }

    const handleApprove = (user_id, name) => {
        setIsShow(true)
        setPopText(`Are you sure you want to approve ${name}?`)
        changeUrl(user_id, '/users/authorize-approval/')
    }

    const handleDisapprove = (user_id, name) => {
        setIsShow(true)
        setPopText(`Are you sure you want to disapprove ${name}?`)
        changeUrl(user_id, '/users/authorize-disapproval/')
    }

    const [showID, setShowID] = useState(false)
    const [src, setSrc] = useState('')
    const handleShowID = (src) => {
        setSrc(src)
        setShowID(true)
    }

    const handleTab = (tab_name) => {
        setSelectTab(tab_name)
    }

    const [showAnnouncement, setShowAnnouncement] = useState(false)
    const [messageAnnouncement, setMessageAnnouncement] = useState('')
    const [whoSend, setWhoSend] = useState('')

    const handleAnnouncement = (message, user) => {
        setWhoSend(user)
        setMessageAnnouncement(message)
        setShowAnnouncement(true)
    }

    return (
        <React.Fragment>
            <h5 className="mb-3">Admin - Philippines</h5>
            <Button 
                style={{
                    background: '#E16D7A',
                    borderColor: '#E16D7A'
                }}
                className="float-right mt-n5" 
                variant="primary" 
                onClick={handleLogout}>Logout</Button>
            <hr />

            <Nav variant="tabs" defaultActiveKey="users">
                <Nav.Item>
                    <Nav.Link onClick={() => handleTab(tabs[0])} eventKey="users">Users</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={() => handleTab(tabs[1])} eventKey="announcements">Announcements</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={() => handleTab(tabs[2])} eventKey="approval">Approval</Nav.Link>
                </Nav.Item>
            </Nav>
            {selectTab === "users" ? <div>
                {isMount === false ? <UserComponent table_data={listNumber} isMount={isMount} setListNumber={setListNumber} isPhone={isPhone} />
                : <div className="text-center">
                    <img src={loading_news} className="bd-placeholder-img" width={isPhone === false ? "500" : "300"} height={isPhone === false ? "500" : "300"} alt="News"></img>
                    <LinearProgress />
                </div>
                }
            </div>
            : null
            }

            {selectTab === "announcements" ? <div>
                <Table style={{
                    overflow: 'scroll',
                    whiteSpace: 'nowrap'
                }} 
                className="mt-2"
                striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Authorize User</th>
                            <th>Announcements</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listAnnouncement.map((announcement, index) => {
                            return (
                                <tr key={index}>
                                    <td>{announcement.user}</td>
                                    <td><Button 
                                        onClick={() => handleAnnouncement(announcement.announcement, announcement.user)}
                                        style={{
                                            background: '#4D74C2',
                                            borderColor: '#4D74C2'
                                        }}>View Announcement</Button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                {/* <Form noValidate validated={validated} onSubmit={handleAnnouncement}>
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
                </Form> */}
            </div>
            : null
            }
            
            {selectTab === "approval" 
            ? <Table style={{
                overflow: 'scroll',
                whiteSpace: 'nowrap'
            }} 
            className="mt-2"
            striped bordered hover responsive>
                <thead>
                    <tr>
                    <th>Email</th>
                    <th>Name</th>
                    <th>Location</th>
                    <th>Valid ID</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listApprove.map((user, index) => {
                        return (
                            <tr key={index}>
                                <td>{user.email}</td>
                                <td>{user.last_name}, {user.first_name}</td>
                                <td>{user.place}</td>
                                <td><Button 
                                    onClick={() => handleShowID(user.valid_id)}
                                    style={{
                                        background: '#E16D7A',
                                        borderColor: '#E16D7A'
                                    }} block>View ID</Button>
                                </td>
                                <td>
                                    <div className="row">
                                        <div className="col">
                                            <Button style={{
                                                background: '#4D74C2',
                                                borderColor: '#4D74C2'
                                            }} onClick={() => handleApprove(user.id, (user.last_name + ', ' + user.first_name))} block>Approve</Button>
                                        </div>
                                        <div className={isPhone === false ? "col" : "col mt-2"}>
                                            <Button style={{
                                                background: '#E16D7A',
                                                borderColor: '#E16D7A'
                                            }} onClick={() => handleDisapprove(user.id, (user.last_name + ', ' + user.first_name))} block>Disapprove</Button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            : null 
            }
            
            <Modal
                show={showAnnouncement}
                onHide={() => setShowAnnouncement(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Announcement
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form.Group className="mb-3">
                    <Form.Label><b>From: {whoSend}</b></Form.Label>
                    <Form.Control value={messageAnnouncement} as="textarea" rows={8} disabled/>
                </Form.Group>
                </Modal.Body>
                    <Modal.Footer>
                    <Button style={{
                        background: '#4D74C2',
                        borderColor: '#4D74C2'
                    }} onClick={() => setShowAnnouncement(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>


            <Modal
                show={showID}
                onHide={() => setShowID(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Valid ID
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="text-center">
                        <img className="img-fluid" width="500" height="500" src={src} alt=""/>
                    </div>
                </Modal.Body>
                    <Modal.Footer>
                    <Button style={{
                        background: '#4D74C2',
                        borderColor: '#4D74C2'
                    }} onClick={() => setShowID(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <ModalAction 
                isShow={isShow} 
                setIsShow={setIsShow} 
                user_id={userID} 
                url={url} 
                setListApprove={setListApprove}
                token={token}
                popText={popText}
            />
        </React.Fragment>
    )
}

function ModalAction({ 
    isShow, 
    setIsShow,
    user_id, 
    url, 
    setListApprove, 
    token,
    popText
}){

    const action = () => {
        axios.post(`${remote}${url}`, {
            user_id: user_id
        }, {
            headers: {
                'Authorization': 'Token ' + token
            }
        }).then(response => {
            if(response.status === 200){
                setListApprove(response.data)
                setIsShow(false)
            }
        }).catch(() => {
            throw new Error('Server Refused. Try again later.')
        })
    }

    return (
        <React.Fragment>
            <Modal
                show={isShow}
                onHide={() => setIsShow(false)}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Actions
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>{popText}</Modal.Body>
                    <Modal.Footer>
                    <Button style={{
                        background: '#4D74C2',
                        borderColor: '#4D74C2'
                    }} onClick={() => setIsShow(false)}>
                        Close
                    </Button>
                    <Button style={{
                        background: '#E16D7A',
                        borderColor: '#E16D7A'
                    }} onClick={action}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    )
}

export default AdminComponent