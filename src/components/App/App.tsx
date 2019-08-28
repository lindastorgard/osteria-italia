import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.scss';
import Admin from '../Admin/Admin'
import Profile from '../Profile/Profile'
import Guests from '../Guests/Guests'
import Date from '../Date/Date'
import Time from '../Time/Time'
import Summary from '../Summary/Summary'
import Confirmation from '../Confirmation/Confirmation'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
class App extends Component<{}, {}> {
  constructor(props: any) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
        <Router>
          <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <a href="/" className="navbar-brand">Osteria Italia</a>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item"><Link to={'/admin'} className="nav-link">Admin</Link></li>
                  <li className="nav-item"><Link to={'/profile'} className="nav-link">Profile</Link></li>
                  <li className="nav-item"><Link to={'/guests'} className="nav-link">Guests</Link></li>
                  <li className="nav-item"><Link to={'/date'} className="nav-link">Date</Link></li>
                  <li className="nav-item"><Link to={'/time'} className="nav-link">Time</Link></li>
                  <li className="nav-item"><Link to={'/summary'} className="nav-link">Summary</Link></li>
                  <li className="nav-item"><Link to={'/confirmation'} className="nav-link">Confirmation</Link></li>
                </ul>
                <hr />
              </div>
            </nav> <br />
            <Switch>
              <Route exact path='/admin' component={ Admin } />
              <Route exact path='/profile' component={ Profile } />
              <Route exact path='/guests' component={ Guests } />
              <Route exact path='/date' component={ Date } />
              <Route exact path='/time' component={ Time } />
              <Route exact path='/summary' component={ Summary } />
              <Route exact path='/confirmation' component={ Confirmation } />
            </Switch>
          </div>
        </Router>
    );
  }
}
export default App;
