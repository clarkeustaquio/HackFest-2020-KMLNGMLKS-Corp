import React from 'react'
import { Container } from 'react-bootstrap'

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

function CardComponent({ title, description, url, urlToImage, isPhone}){
    const classes = useStyles();

    let isComplete = false
    if(title && description && url && urlToImage){
        isComplete = true

        if(!isPhone){
            if(title.length > 60){
                title = title.substring(0, 60) + '...'
            }
            
            if(description.length > 100){
                description = description.substring(0, 100) + '...'
            }
        }
    }else{
        isComplete = false
    }

    return(
        <React.Fragment>
            {isComplete ? 
                <Container>
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image={ urlToImage }
                            title="Contemplative Reptile"
                        />

                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {description}
                            </Typography>
                        </CardContent>
                    </CardActionArea>

                    <CardActions>
                        <Button size="small" color="primary">
                            Share
                        </Button>
                        <Button size="small" color="primary">
                            Learn More
                        </Button>
                    </CardActions>
                </Card>
            </Container>
            :
            <div></div>
        }
            
        </React.Fragment>
    )
}

export default CardComponent