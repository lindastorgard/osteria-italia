import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import 'bootstrap/scss/bootstrap.scss';
import Nav from '../Nav/Nav';
import Booking from '../Booking/Booking';
import Menu from '../Menu/Menu'
import Admin from '../Admin/Admin';
import LandingPage from '../LandingPage/LandingPage';
import About from '../About/About';
import './App.scss';

import Footer from '../Footer/Footer';
import './App.scss';

class App extends Component<{}, {}> {
  constructor(props: any) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
        <Router>
          <div>
            <Nav />
            <div className="content">
            <Switch>
              <Route exact path='/admin' component={ Admin } />
              <Route exact path='/booking' component={ Booking } /> 
              <Route exact path='/menu' component={ Menu} />
              <Route exact path='/about' component={ About} />
              <Route exact path='/' component={ LandingPage } />
            </Switch>
            </div>
            <Footer />  
          </div>
        </Router>
    );
  }
}
export default App;
