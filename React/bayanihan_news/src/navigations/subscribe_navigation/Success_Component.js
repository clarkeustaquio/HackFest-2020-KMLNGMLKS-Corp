import React from 'react'
import { Container } from 'react-bootstrap'
import subscribe from '../../static/images/subscribe.png'
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

function SuccessComponent(){
    const classes = useStyles();

    return (
        <React.Fragment>
            <Container>
                <Container fluid className="h-100">
                    <div className="row featurette mt-3">
                        <div className="col-md-6">
                            <h2 className="featurette-heading font-weight-bold"><span style={{ color: '#4D74C2' }}>Successfully</span> <span style={{ color: '#E16D7A' }}>Subscribed</span></h2>
                            <p>Thank you for subscribing to Bayanihan News. You will receive message shortly.</p>
                            <ul className="mt-3">
                                <li><p className="lead">Your daily news provider.</p></li>
                                <li><p className="lead">Provides instant news via text message.</p></li>
                                <li><p className="lead">Accurate and reliable news posted.</p></li>
                                <li><p className="lead">Can be viewed via text message, mobile app, and website.</p></li>
                                <li><p className="lead">Prioritizes important news.</p></li>
                            </ul>

                        <div className={classes.root}>
                            <Link to='/contact'>
                                <Button style={{
                                            background: '#4D74C2',
                                            borderColor: '#4D74C2'
                                        }} size="large" className="ml-4" variant="contained" color="primary">
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
                        </div>
                        </div>
                        <div className="col-md-6">
                            <img className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="800" height="800" src={subscribe} alt="Fishermen"></img>
                        </div>
                    </div>
                </Container>
            </Container>
            
        </React.Fragment>
    )
}

export default SuccessComponent