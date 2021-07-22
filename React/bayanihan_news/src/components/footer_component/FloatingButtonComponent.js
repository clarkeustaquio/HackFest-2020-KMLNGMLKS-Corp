
import React from 'react';
import Fab from '@material-ui/core/Fab';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    fab: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  }));
  
function FloatingButtonComponent({ color }) {
    const classes = useStyles()

    const scrollTop = () => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth' })
    }

    return (
        <React.Fragment>
            <Fab style={{
                background: color,
                borderColor: color
            }} className={classes.fab} aria-label="privacy_policy" onClick={scrollTop}>
                <ArrowUpwardIcon style={{ color: 'white' }} />
            </Fab>
        </React.Fragment>
        
    );
  }

export default FloatingButtonComponent