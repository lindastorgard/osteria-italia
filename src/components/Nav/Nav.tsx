import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class Nav extends React.Component {
    render() {
        return (
					<nav className="navbar navbar-expand-lg navbar-light bg-light">
					<a href="/" className="navbar-brand">Osteria Italia</a>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav mr-auto">
							<li className="nav-item"><Link to={'/menu'} className="nav-link">Menu</Link></li>
							<li className="nav-item"><Link to={'/booking'} className="nav-link">Reservations</Link></li>	
						</ul>
						<hr />
					</div>
				</nav> 
        )
    }
}
export default Nav;
