import React from 'react'
import bayanihan_news_logo from '../../static/images/bayanihan_news_logo.png'
function LogoComponent(){
    return (
        <React.Fragment>
            <img width="50" height="50" src={bayanihan_news_logo} alt="Logo"></img>
            <span className="h5"><span style={{color: '#4D74C2'}}>Bayanihan</span><span style={{ color: '#E16D7A'}}>News</span></span>
        </React.Fragment>
    )
}

export default LogoComponent