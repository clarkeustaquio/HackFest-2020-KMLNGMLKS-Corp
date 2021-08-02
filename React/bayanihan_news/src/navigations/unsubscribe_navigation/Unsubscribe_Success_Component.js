import React from 'react'
import { Container } from 'react-bootstrap'
import unsubscribe from '../../static/images/unsubscribe.png'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));


function UnsubscribeSuccessComponent({ isPhone }){
    const classes = useStyles();
    return (
        <React.Fragment>
            <Container>
                <Container fluid className="h-100">
                    <div className="row featurette">
                        <div className="col-md-6 order-md-2">
                            <h2 className="featurette-heading font-weight-bold"><span style={{ color: '#4D74C2' }}>Successfully</span> <span style={{ color: '#E16D7A' }}>Unsubscribed</span></h2>
                            <p>Thank you for using Bayanihan News. You will no longer receive any message from us.</p>
                            <ul className="mt-3">
                                <li><p className="lead">Wide availability of the news anytime and anywhere.</p></li>
                                <li><p className="lead">Updates people on time with the assurance of   not missing any important details.</p></li>
                                <li><p className="lead">Daily news via text message.</p></li>
                                <li><p className="lead">Fast transmission of flash news and warnings in different medias and platforms</p></li>
                            </ul>
                            {isPhone === false ? <div className={classes.root}>
                                <Link to='/contact'>
                                    <Button style={{
                                            background: '#4D74C2',
                                            borderColor: '#4D74C2'
                                        }} className="ml-4" size="large" variant="contained" color="primary">
                                        Contact Us
                                    </Button>
                                </Link>
                                
                                <Button style={{
                                            background: '#E16D7A',
                                            borderColor: '#E16D7A',
                                            textDecoration: 'none',
                                            color: 'white'
                                        }} size="large" href="https://github.com/jeikatsu/Bayanihan-News" variant="contained" color="primary">
                                    Download
                                </Button>
                            </div> : null
                            }
                        </div>
                        {isPhone === true ? <div className={classes.root}>
                                <Link to='/contact'>
                                    <Button style={{
                                            background: '#4D74C2',
                                            borderColor: '#4D74C2'
                                        }} className="ml-4" size="medium" variant="contained" color="primary">
                                        Contact Us
                                    </Button>
                                </Link>
                                
                                <Button style={{
                                            background: '#E16D7A',
                                            borderColor: '#E16D7A',
                                            textDecoration: 'none',
                                            color: 'white'
                                        }} size="medium" href="https://github.com/jeikatsu/Bayanihan-News" variant="contained" color="primary">
                                    Download
                                </Button>
                            </div>
                        : null
                        }
                        <div className="col-md-6 order-md-1">
                        <img className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="800" height="800" src={unsubscribe} alt="Solution"></img>
                        </div>
                    </div>
                </Container>
            </Container>
        </React.Fragment>
    )
}

export default UnsubscribeSuccessComponent