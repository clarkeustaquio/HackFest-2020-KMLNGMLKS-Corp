import React from 'react'

import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress'

import { Container } from 'react-bootstrap'

import CardComponent from './Card_Component';

import 'bootstrap/dist/css/bootstrap.min.css';

function DailyNewsComponent({ isPhone }) {
    const url = 'http://newsapi.org/v2/top-headlines?country=ph&apiKey=a3befdaa830b4a0595fa9b145c17929e'
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
    }, [])

    return (
        <React.Fragment>
            { isPhone || 
                <div className="text-center">
                    <h1>Daily News</h1>
                    <p>Keep yourself with the latest updates</p>
                </div> 
            }

            {isLoading ? 
                <Container>
                    <div className="text-center">
                        <CircularProgress />
                    </div>
                </Container> :
                <Grid
                    alignItems="center" 
                    justify="center" 
                    container 
                    spacing={3}
                >
                    {news.articles.map((data, index) => {
                        return (
                            <Grid item key={index} >
                                <CardComponent {...data} isPhone={isPhone}/>
                            </Grid>
                        )
                    })}
                </Grid>
            }
        </React.Fragment>
    )
}

export default DailyNewsComponent