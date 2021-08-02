import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import CreateComponent from './CreateComponent'
import LoginComponent from './LoginComponent'
import PrivateComponent from './PrivateComponent'

import background from '../../static/images/background_fishing.png'
import background_jeep from '../../static/images/background_jeep.png'

function AuthorizeComponent({ isPhone }){
    const [isAuthorize, setIsAuthorize] = useState(false)

    useEffect(() => {
        document.title = 'Authorize'
    }, [])
    
    return (
        <React.Fragment>
            <Container className="mt-4">
                {localStorage.getItem('token')
                ? <PrivateComponent isPhone={isPhone} /> // ? <div>{isAuthorize === true ? <PrivateComponent isPhone={isPhone} /> : null }</div>
                : <div>
                    {isPhone === false ? <div>
                        <Row>
                            <Col>
                                <img className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="1000" height="1000" src={background_jeep} alt="Background"></img> 
                            </Col>
                            <Col>
                                <LoginComponent setIsAuthorize={setIsAuthorize} />
                            </Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col>
                                <CreateComponent isPhone={isPhone} /> 
                            </Col>
                            <Col>
                                <img className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="1000" height="1000" src={background} alt="Background"></img>
                            </Col>
                        </Row>
                        
                    </div> : <div>
                        <LoginComponent setIsAuthorize={setIsAuthorize} />
                        <hr />
                        <CreateComponent isPhone={isPhone}  /> 
                    </div>
                    }
                </div>
                }
            </Container>
        </React.Fragment>
    )
}

export default AuthorizeComponent