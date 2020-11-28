import React from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router-dom'


function FooterComponent({ isPhone }){
    const featurette = {
        margin: '5rem 0',
    }

    const scrollTop = () => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth' })
    }

    const footerStyle = {
        display: 'block',
        padding: '20px',
        height: '60px',
        width: '100%',
    }
    const path = useLocation()

    return (
        <React.Fragment>
            <Container> 
                <footer style={footerStyle}>
                    <hr style={featurette}></hr>
                    {isPhone 
                       ?<div className="mt-n5 mb-3 text-center">
                           <p className="mb-3">&copy; 2020 KMLNGMLKS Corp. </p>
                           <p><Link to={path} onClick={scrollTop} style={{ textDecoration: 'none'}}>&middot; Privacy</Link> <Link to={path} onClick={scrollTop} style={{ textDecoration: 'none'}}>&middot; Terms</Link></p>
                           <Link to={path} onClick={scrollTop} style={{ textDecoration: 'none'}}>Back to top</Link>
                       </div>
                        :
                        <div className="mt-n5">
                            <Link to={path} className="float-right" onClick={scrollTop} style={{ textDecoration: 'none'}}>Back to top</Link>
                            <p className="mb-3">&copy; 2020 KMLNGMLKS Corp. &middot; Privacy &middot; Terms</p>
                        </div>
                    }
                </footer>
            </Container>
        </React.Fragment>
    )
}

export default FooterComponent