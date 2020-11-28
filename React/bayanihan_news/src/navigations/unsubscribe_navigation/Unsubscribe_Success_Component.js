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

function UnsubscribeSuccessComponent(){
    const classes = useStyles();
    return (
        <React.Fragment>
            <Container fluid className="h-100">
                <div className="row featurette">
                    <div className="col-md-7 order-md-2">
                        <h2 className="featurette-heading font-weight-bold">Successfully Unsubscribed</h2>
                        <p>Thank you for using Bayanihan News. You will no longer receive any message from us.</p>
                        <ul className="mt-3">
                            <li><p className="lead">Wide availability of the news anytime and anywhere.</p></li>
                            <li><p className="lead">Updates people on time with the assurance of   not missing any important details.</p></li>
                            <li><p className="lead">Daily news via text message.</p></li>
                            <li><p className="lead">Fast transmission of flash news and warnings in different medias and platforms</p></li>
                        </ul>
                        <div className={classes.root}>
                            <Link to='/about'>
                                <Button className="ml-4" variant="contained" color="primary">
                                    Contact Us
                                </Button>
                            </Link>
                            
                            <Button className="ml-4" href="https://github.com/clarkeustaquio/HackFest-2020-KMLNGMLKS-Corp" variant="contained" color="primary">
                                Download
                            </Button>
                        </div>   
                    </div>
                    <div className="col-md-5 order-md-1">
                    <img className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500" height="500" src={unsubscribe} alt="Solution"></img>
                    </div>
                </div>
            </Container>
        </React.Fragment>
    )
}

export default UnsubscribeSuccessComponent