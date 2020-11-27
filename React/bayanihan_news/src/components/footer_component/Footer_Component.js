import React from 'react'
import { Container } from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css';


function FooterComponent(){
    const featurette = {
        margin: '5rem 0',
    }

    const scrollTop = () => {
        window.scrollTo(0, 0)
    }

    // const footer_stick = {
    //     position:'absolute',
    //     left:'0',
    //     bottom:'0',
    //     right:'0',
    // }

    return (
        <React.Fragment>
            <Container>          
                <footer className="mb-5">
                    <hr style={featurette}></hr>
                    <a href="/" className="float-right" onClick={scrollTop} style={{ textDecoration: 'none'}}>Back to top</a>
                    <p>&copy; 2020 KMLNGMLKS Corp. &middot; Privacy &middot; Terms</p>
                </footer>
            </Container>
        </React.Fragment>
    )
}

export default FooterComponent