import React from 'react'

function WaveComponent(){
    return (
        <React.Fragment>
            <svg 
                style={{
                    // position: 'absolute',
                    // // bottom: 0,
                    // width: '100%',
                }}
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 1440 320">
                <path 
                    fill="#E16D7A" 
                    fillOpacity="1" 
                    d="M0,192L288,96L576,256L864,96L1152,160L1440,32L1440,320L1152,320L864,320L576,320L288,320L0,320Z">
                </path>
            </svg>
        </React.Fragment>
    )
}

export default WaveComponent