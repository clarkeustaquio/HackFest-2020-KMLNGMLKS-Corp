import React from 'react'
import { Container } from 'react-bootstrap'
import './about.css'

import Grid from '@material-ui/core/Grid';
import AboutCardComponent from './About_Card_Component'

import bayanihan_news_1 from '../../static/images/bayanihan_news_1.png'
import bayanihan_news_2 from '../../static/images/bayanihan_news_2.png'
import bayanihan_news_3 from '../../static/images/bayanihan_news_3.png'
import bayanihan_news_4 from '../../static/images/bayanihan_news_4.png'
import bayanihan_news_5 from '../../static/images/bayanihan_news_5.png'

import fishermen from '../../static/images/fishermen.jpg'
import solution from '../../static/images/solution.jpg'

function AboutComponent({ isPhone }){
    const contents = [
        { words: 'Provides instant news via text message.', image: bayanihan_news_1 },
        { words: 'Your daily news provider.', image: bayanihan_news_2 },
        { words: 'Accurate and reliable news posted.', image: bayanihan_news_3 },
        { words: 'Can be viewed via text message, mobile app, and website.', image: bayanihan_news_4 },
        { words: 'Prioritizes important news.', image: bayanihan_news_5 },
    ]
    React.useEffect(() => {
        document.title = 'About'
    })
    return (
        <React.Fragment>
            <Container>
                <section id="situation">
                    {isPhone || <hr className="featurette-divider"></hr>}
                    <div className="row featurette mt-2">
                        <div className="col-md-7">
                            <h2 className="featurette-heading font-weight-bold">Current Situtaion</h2>
                            <ul className="mt-3">
                                <li><p className="lead">Limited access to obtain daily news</p></li>
                                <li><p className="lead">Not everyone can watch the news due to time insufficiency</p></li>
                                <li><p className="lead">Important government announcements are missed</p></li>
                                <li><p className="lead">Some tend to overlook important news due to the unavailability of resources. For that reason, people receive late warnings</p></li>
                            </ul>
                        </div>
                        <div className="col-md-5">
                            <img className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500" height="500" src={fishermen} alt="Fishermen"></img>
                            
                        </div>
                    </div>
                </section>
                <section id="solution">
                    <hr className="featurette-divider"></hr>
                    <div className="row featurette">
                        <div className="col-md-7 order-md-2">
                            <h2 className="featurette-heading font-weight-bold">Our Solution</h2>
                            <ul className="mt-3">
                                <li><p className="lead">Wide availability of the news anytime and anywhere.</p></li>
                                <li><p className="lead">Updates people on time with the assurance of   not missing any important details.</p></li>
                                <li><p className="lead">Daily news via text message.</p></li>
                                <li><p className="lead">Fast transmission of flash news and warnings in different medias and platforms</p></li>
                            </ul>   
                        </div>
                        <div className="col-md-5 order-md-1">
                        <img className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500" height="500" src={solution} alt="Solution"></img>
                        </div>
                    </div>
                </section>
                <section id="goals">
                <div className = "text-center">
                    <hr className="featurette-divider"></hr>
                    <h2 className="featurette-heading font-weight-bold">Bayanihan News</h2>
                    <p className="lead">We provide you the latest updates</p>
                </div>
                <Grid
                    alignItems="center" 
                    justify="center" 
                    container 
                    spacing={3}
                >
                    {contents.map((content, index) => {
                        return (
                            <Grid item key={index}>
                                <AboutCardComponent word={content.words} image={content.image}/>
                            </Grid>
                        )
                    })}
                </Grid>
                </section>
            </Container>
        </React.Fragment>
    )
}

export default AboutComponent