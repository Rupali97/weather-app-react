import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Route, Switch, Redirect, BrowserRouter, useHistory, Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';


const useStyles = makeStyles({
  root: {
    maxWidth: 275,
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
});


function DateCard(props) {
  const classes = useStyles();

  const getDate = (timestamp) => {
    var date = new Date(timestamp * 1000)

    const stringDate = JSON.stringify(date)
    const finalDate = stringDate.substring(1,11)
    return finalDate;
  }

  return (
    <>
      
       
        <Link to={`/${props.timestamp}`} style={{textDecoration: "none"}}>
          
          <ButtonBase style={{margin: 10, background: 'white', boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)", padding: 20}}>
          
            <Typography color="textSecondary" gutterBottom>
              {getDate(props.timestamp)}
            </Typography>
        
          </ButtonBase>
      
 
        </Link>
    
       
   
    </>
  )
}

export default DateCard
