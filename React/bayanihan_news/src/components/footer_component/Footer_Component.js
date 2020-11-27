import React from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';


function FooterComponent(){
    const featurette = {
        margin: '5rem 0',
    }

    const scrollTop = () => {
        window.scrollTo(0, 0)
    }

    const footerStyle = {
        display: 'block',
        padding: '20px',
        height: '60px',
        width: '100%',
    }

    return (
        <React.Fragment>
            <Container>          
                <footer className="mb-5" style={footerStyle}>
                    <hr style={featurette}></hr>
                    <Link to='/' className="float-right" onClick={scrollTop} style={{ textDecoration: 'none'}}>Back to top</Link>
                    <p className="mb-3">&copy; 2020 KMLNGMLKS Corp. &middot; Privacy &middot; Terms</p>
                </footer>
            </Container>
        </React.Fragment>
    )
}

export default FooterComponent