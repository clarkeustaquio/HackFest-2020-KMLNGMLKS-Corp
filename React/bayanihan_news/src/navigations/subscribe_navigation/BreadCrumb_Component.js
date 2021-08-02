import React from 'react'
import { Container } from 'react-bootstrap'
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link'
import { useLocation } from 'react-router-dom'
import firebaseConfig from '../../firebaseConfig'

function BreadCrumbComponent(){
    const [isBlack, setIsBlack] = React.useState('black')
    const [isGray, setIsGray] = React.useState('gray')
    const location = useLocation()

    React.useEffect(() => {
        if(location.pathname === '/subscribe'){
            setIsBlack('black')
            setIsGray('gray')
            firebaseConfig.auth().signOut()
        }else{
            setIsBlack('gray')
            setIsGray('black') 
            firebaseConfig.auth().signOut()
        }
    }, [location.pathname])
    return (
        <React.Fragment>
            <Container>
                <Breadcrumbs aria-label="breadcrumb" className="mt-n4">
                    <Link 
                        style={{ textDecoration: 'none', color: isBlack}} 
                        color="inherit" href="/subscribe">Subscribe</Link>
                    <Link 
                        style={{ textDecoration: 'none', color: isGray}} 
                        color="inherit" href="/unsubscribe">Unsubscribe</Link>
                </Breadcrumbs>
            </Container>
            
        </React.Fragment>
    )
}

export default BreadCrumbComponent