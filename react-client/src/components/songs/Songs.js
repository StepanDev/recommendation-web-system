import React from 'react';
import axios from 'axios'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { CircularProgress, LinearProgress, TextField, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Profile from '../profile/Profile'
const styles = {
  root: {
    width: 500,
  },
  paper: {
    width: 500,
    margin: '10px auto',
    boxShadow: '0px 2px 1px -1px rgba(94,0,0,0.2), 0px 1px 1px 0px rgba(80,0,0,0.34), 0px 1px 3px 0px rgba(27,0,0,0.32)'
  },
  centeredDiv: {
    width: 200,
    margin: '5px auto',
  },
  genBtn: {
    display: 'block',
    margin: '5px auto',
    width: 200,
  },
  userCard: {
    width: 500,
  },
  textCenter:{
    textAlign:'center'
  }
};

class Songs extends React.Component {
  constructor(props) {
    super(props);
    this.onBtnClick = this.onBtnClick.bind(this)
    this.onChangeUserName = this.onChangeUserName.bind(this)

    this.state = {
      songs: [],
      loaded: true,
      username: '',
      user: {},
      neigborsCount: 10, 
      songsCount: 10, 

    }
  }

  onChangeUserName(e) {
    this.setState({ username: e.target.value })
  }

  async onBtnClick(e) {
    this.setState({ loaded: false })
    const { data } = await axios.get('http://localhost:3001/last', { params: { username: this.state.username } })
    const { songs, user } = data;
    this.setState({ songs: songs, loaded: true, user })
  }

  render() {
    const { classes } = this.props
    const { user, firstRun, songs } = this.state
    return (
      <>
        <form>
          <div className={classes.centeredDiv}>
            <TextField label="Введіть lastFM username" value={this.state.username} onChange={this.onChangeUserName} />
            <TextField label="Кількість сусідів" />
            <TextField label="Кількість пісень"  />

            <Button variant="contained" onClick={this.onBtnClick} disabled={!this.state.username || !this.state.loaded} component='button' className={classes.genBtn}>
              Згенерувати
          </Button>
          </div>
        </form>
        {!this.state.loaded
          ? <LinearProgress />
          : <>
            {songs ? <>

              {user && user.url && <Profile user={user} firstRun={firstRun} />}
              {songs && songs.length ?
                <Typography variant="h2" variant="h2" className={classes.textCenter}>
                  Згенеровані рекомендації
                </Typography>
                :<></>
              }
              {songs.map(song =>
                <a key={song.songId} href={song.url}>
                  <Paper className={classes.paper}>
                    <img src={song.image[1]['#text']}></img>
                    <Typography variant="h5" component="h3">
                      пісня: {song.name}
                    </Typography>
                    <Typography>
                      автор: {song.artist.name}
                    </Typography>
                  </Paper>
                </a>
              )}
            </>
              : <Typography variant="subtitle1" color="textSecondary">
                Користувача не здайдено
                    </Typography>}
          </>
        }
      </>

    )
  }
}

export default withStyles(styles)(Songs)