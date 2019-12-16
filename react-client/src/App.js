import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import 'typeface-roboto';
import Navigation from './components/navigation/Navigation'
import Songs from './components/songs/Songs'

const API_KEY = "44744c0aec4d6a4e2c2584cb3dcdcc1e"

class App extends React.Component {

  getParams(location) {
    const searchParams = new URLSearchParams(location.search);
    console.log("searchParams.get('token') || ''", searchParams.get('token'))
    return {
      query: searchParams.get('token') || '',
    };
  }

  componentDidMount() {
    const params = this.getParams(window.location);
    const token = params.query;
    console.log('token', token)
    if (!token) {
      window.location = `http://www.last.fm/api/auth/?api_key=${API_KEY}`
    } else {
      // sta
    }
  }

  render() {

    return (
      <div className="App">
        <Router>
          <div>
            <Navigation />

            {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
            <Switch>
              <Route path="/about">
                <About />
              </Route>
              <Route path="/users">
                <Users />
              </Route>
              <Route path="/">
                <Songs />
              </Route>
            </Switch>
          </div>
        </Router>

      </div>
    );
  }
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}
export default App;
