import React from 'react'
import { Container, Jumbotron } from 'react-bootstrap'

function HeroComponent({ isPhone, hero_image }){
    const jumbotron_image = {
        height: '500px',
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(' + hero_image + ')',
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