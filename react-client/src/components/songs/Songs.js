import React from 'react';
import axios from 'axios'

import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
  root: {
    width: 500,
  },
});

class Songs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: []
    }
  }

  async componentDidMount() {
    const {data} = await axios.get('http://localhost:3001/last')
    this.setState({songs:data})
  }

  render() {
    // const classes = useStyles();
    console.log(this.state)
    return (
      <ul>
        {this.state.songs.map(song => 
          <li>
            <span>Name {song.name}</span>
            <br />
            <span>Artist {song.artist.name}</span>
          </li>
        )}
      </ul>

    )
  }
}

export default Songs