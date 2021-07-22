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

    var style = {
        backgroundColor: "#F8F8F8",
        borderTop: "1px solid #E7E7E7",
        textAlign: "center",
        padding: "20px",
        position: "fixed",
        left: "0",
        bottom: "0",
        height: "60px",
        width: "100%",
    }
    
    var phantom = {
      display: 'block',
      padding: '20px',
      height: '60px',
      width: '100%',
    }

    return (
        <React.Fragment>
            <footer style={footerStyle}>
                
                <hr style={featurette}></hr>
                {isPhone 
                    ?<div className="mt-n5 mb-3 text-center">
                        <p className="mb-3">&copy; 2021 KMLNGMLKS Corp. </p>
                        <p><Link to={path} onClick={scrollTop} style={{ textDecoration: 'none'}}>&middot; Privacy</Link> <Link to={path} onClick={scrollTop} style={{ textDecoration: 'none'}}>&middot; Terms</Link></p>
                        <Link to={path} onClick={scrollTop} style={{ textDecoration: 'none'}}>Back to top</Link>
                    </div>
                    :
                    <div className="mt-n5">
                        <Link to={path} className="float-right" onClick={scrollTop} style={{ textDecoration: 'none'}}>Back to top</Link>
                        <p className="mb-3">&copy; 2021 KMLNGMLKS Corp. &middot; Privacy &middot; Terms</p>
                    </div>
                }
            </footer>
        </React.Fragment>
    )
}

export default FooterComponent