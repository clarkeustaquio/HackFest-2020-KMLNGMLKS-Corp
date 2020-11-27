import React from 'react'
import { Container, Jumbotron } from 'react-bootstrap'
import news_hero_image from '../../static/images/news_hero_image.jpg'

function HeroComponent({ isPhone }){
    const jumbotron_image = {
        height: '500px',
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(' + news_hero_image + ')',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    }

    return (
        <React.Fragment>
            { isPhone ||
                <Jumbotron fluid style={jumbotron_image}>
                    <Container>
                        
                    </Container>
                </Jumbotron>
            }
            
        </React.Fragment>
    )
}

export default HeroComponent