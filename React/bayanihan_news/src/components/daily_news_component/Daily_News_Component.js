import React from 'react'

import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress'
import { LinearProgress } from '@material-ui/core';
import loading_news from '../../static/images/loading_news.png'

import { Container } from 'react-bootstrap'

import CardComponent from './Card_Component';

import 'bootstrap/dist/css/bootstrap.min.css';

function DailyNewsComponent({ isPhone }) {
    // They don't allowed hosted applications -- Own API
    const url = 'https://bayanihan-news.herokuapp.com/api/request-news/'
    const [isLoading, setIsLoading] = React.useState(true)
    const [news, setNews] = React.useState({})

    React.useEffect(() => {
        fetch(url).then((response) => {
            if(response.status >= 200 && response.status < 300){
                return response.json()
            }else{
                setIsLoading(false)
                // set Loading
                // set Error page
            }
        }).then((news) => {
            setNews(news)
            setIsLoading(false)
        })

        document.title = 'BayanihanNews'
    }, [])

    return (
        <React.Fragment>
            { isPhone || 
                <div className="text-center">
                    <h1 className="font-weight-bold"><span style={{ color: '#4D74C2' }}>Daily</span> <span style={{ color: '#E16D7A' }}>News</span></h1>
                    <p>Keep yourself with the latest updates</p>
                </div> 
            }

            {isLoading ? 
                <Container>
                    <div className="text-center">
                        <img src={loading_news} className="bd-placeholder-img" width="500" height="500" alt="News"></img>
                        <LinearProgress />
                    </div>
                </Container> :
                <Grid
                    alignItems="stretch" 
                    justify="center" 
                    container 
                >
                    {
                    news ? news.articles.map((data, index) => {
                        return (
                            <Grid item key={index} className="mb-4">
                                <CardComponent {...data} isPhone={isPhone}/>
                            </Grid>
                        )
                    }) : <CircularProgress />
                    }
                </Grid>
            }
        </React.Fragment>
    )
}

export default DailyNewsComponent