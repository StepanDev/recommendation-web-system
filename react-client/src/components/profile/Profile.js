import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    card: {
        display: 'flex',
        margin: 10,
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 151,
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    playIcon: {
        height: 38,
        width: 38,
    },
}));

export default function Profile(props) {
    const classes = useStyles();
    const { user } = props;
    console.log('props', props)
    console.log('user', user)

    return (
        <>
            {user && user.url ? <a href={user.url}>
                <Card className={classes.card}>
                    {user.image && (<>
                        <CardMedia
                            className={classes.cover}
                            image={user.image[2]['#text']}
                            title="Live from space album cover"
                        />
                        <div className={classes.details}>
                            <CardContent className={classes.content}>
                                <Typography variant="subtitle1" color="textSecondary">
                                    Дані користувача
                            </Typography>
                                <Typography component="h3" variant="h3">
                                    {user.realname}
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary">
                                    кількість прослуховувань: {user.playcount}
                                </Typography>
                            </CardContent>
                        </div>
                    </>)}
                </Card>
            </a> : <Typography variant="subtitle1" color="textSecondary">
                    Дані про користувача не здайдено
                            </Typography>}

        </>
    )
}