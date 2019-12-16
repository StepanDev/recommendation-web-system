import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: 500,
  },
});

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null
    }
  }

  render() {
    // const classes = useStyles();
    const { value } = this.state;
    return (
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link></li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>

      </nav>
    )
  }
}
// return (
//   <BottomNavigation
//     value={value}
//     onChange={(event, newValue) => {
//       this.setState({value: newValue});
//     }}
//     showLabels
//   //   className={classes.root}
//   >
//     <BottomNavigationAction label="Home" icon={<HomeIcon />} />
//     <BottomNavigationAction label="Profile" icon={<PersonIcon />} />
//   </BottomNavigation>
// )
export default Navigation