import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
   textCenter:{
       textAlign: 'center'
   }
}));

export default function About() {
    const classes = useStyles();
    return (
        <Typography className={classes.textCenter}>
            Цей веб-сайт створено як приклад роботи рекомендаційної системи для магістерської роботи студента групи ПММ2 Швеця Степана
        </Typography>
    )
}