import React from 'react'
import { Container } from 'react-bootstrap'
import FacebookIcon from '@material-ui/icons/Facebook';

import conntact_1 from '../../static/images/contact_1.png'
import conntact_2 from '../../static/images/contact_2.png'
import conntact_3 from '../../static/images/contact_3.png'
import conntact_4 from '../../static/images/contact_4.png'

function ContactComponent({ isPhone}){
    
    const names = [
        { name : 'Joruel Braña', facebook: 'https://www.facebook.com/jogjog.brana', image: conntact_1},
        { name : 'Alexander Gali', facebook: 'https://www.facebook.com/Alexander.Gali.CS', image: conntact_2},
        { name : 'Clark Eustaquio', facebook: 'https://www.facebook.com/clark.eustaquio', image: conntact_3},
        { name : 'CJ Fatalla', facebook: 'https://www.facebook.com/profile.php?id=100008977066085', image: conntact_4}       
    ]
    React.useEffect(() => {
        document.title = 'Contact'
    })
    return (
        <React.Fragment>
            <Container>
            { isPhone || 
                <div className="text-center">
                    <h1>KMLNGMLKS Corp.</h1>
                    <p>We would like to help you</p>
                </div> 
            }

            <div className="row mb-2 mt-5">
                {names.map((data, index) => {
                    return (
                        <div key={index} className="col-md-6">
                            <div className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                                <div className="col p-4 d-flex flex-column position-static">
                                    <strong className="d-inline-block mb-2 text-primary">Blue Hacks</strong>
                                    <h3 className="mb-0">{data.name}</h3>
                                <div className="mb-1 text-muted">Computer Scientist</div>
                                <p className="card-text mb-auto">We aim to be a company in the future that can contribute better communication tool between people and information for their daily lives.</p>
                                    <a href={data.facebook} style={{ textDecoration: 'none'}} className="mt-2 mb-n2"><FacebookIcon style={{fill: "#3B5998"}}/> Contact with Facebook</a>
                                </div>
                                <div className="col-auto d-none d-lg-block">
                                    <img src={data.image} className="bd-placeholder-img" width="200" height="250" alt={data.name}></img>
                                </div>
                            </div>
                            </div>
                        )
                    })
                } 
            </div>


            </Container>
        </React.Fragment>
    )
}

export default ContactComponent