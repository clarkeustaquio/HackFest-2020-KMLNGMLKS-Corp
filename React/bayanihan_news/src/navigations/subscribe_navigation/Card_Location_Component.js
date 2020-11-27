import React from 'react'
import { Container } from 'react-bootstrap'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import firebaseConfig from '../../firebaseConfig'
import { Link } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 200,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    root: {
        maxWidth: 345,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    media: {
        height: 180,
    },
  }));


function CardLocationComponent({ phoneNumber, setIsSuccess, userID }){
    const classes = useStyles();
    const [location, setLocation] = React.useState('');
    const [isDisabled, setIsDisabled] = React.useState(false)

    const handleChange = (event) => {
        setLocation(event.target.value);
    };

    const handleSubscribe = () => {
        const db = firebaseConfig.firestore()

        db.collection('users').doc(userID).set({
            'phoneNumber': phoneNumber,
            'location': location,
        }).then(() => {
            firebaseConfig.auth().signOut()
        }).catch((error) => {
            console.log('Subscribe Failed')
        })

        const requestSMS = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({title: 'Subscribe', phoneNumber: phoneNumber})
        }

        fetch('https://bayanihan-news.herokuapp.com/api/sendSMS/', requestSMS)
            .then((response) => {
                return response.json()
            }).then((data) => {
                console.log(data)
            })

        setIsSuccess(true)
        setIsDisabled(true)
    }

    const handleCancel = () => {
        let user = firebaseConfig.auth().currentUser
        if(user){
            user.delete().catch((error) => {
                console.log('Failed')
            })
        }
    }
    return (
        <React.Fragment>
            <Container style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
            <Card className={classes.root}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Add Location
                    </Typography>

                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Region</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={location}
                        onChange={handleChange}
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                    <Container >
                    <Link to='/' onClick={handleCancel}>
                        <Button disabled={isDisabled} variant="contained" color="primary" className="mt-4 mr-2">
                            Cancel
                        </Button>
                    </Link>
                    <Button disabled={isDisabled} variant="contained" color="primary" className="mt-4 ml-2" onClick={handleSubscribe}>
                        Subscribe
                    </Button>
                    </Container>
                </CardContent>
            </Card>
        </Container>
    </React.Fragment>
    )
}

export default CardLocationComponent