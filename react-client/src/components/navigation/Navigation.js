import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { AppBar, Toolbar, Typography } from '@material-ui/core';

const styles = {
  aboutLink:{
    position: 'fixed',
    right: 20
  },
  title:{
    color: 'white',

  }
};

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null
    }
  }

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    return (
      <AppBar position="static">
        <Toolbar>
          <Link to="/">
            <Typography variant="h6" className={classes.title}>
              Головна
            </Typography>
          </Link>
          <div className={classes.aboutLink}>
            <Link to="/about">
              <Typography variant="h6" className={classes.title}>
                Про веб-сайт
            </Typography>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    )
  }
}

export default withStyles(styles)(Navigation)