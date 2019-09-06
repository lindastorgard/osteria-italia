import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Nav from '../Nav/Nav';
import Booking from '../Booking/Booking';
import Menu from '../Menu/Menu'
import Admin from '../Admin/Admin';
import 'bootstrap/scss/bootstrap.scss';
import './App.scss';
import SimpleGDPR from 'simple-gdpr';
import 'simple-gdpr/dist/simplegdpr.min.css';
 
const notice = new SimpleGDPR();

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
            <Nav />
            <Switch>
              <Route exact path='/admin' component={ Admin } />
              <Route exact path='/booking' component={ Booking } /> 
              <Route exact path='/menu' component={ Menu } />
            </Switch>
          </div>
        </Router>
    );
  }
}
export default App;
