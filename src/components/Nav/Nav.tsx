import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.scss';

class Nav extends React.Component {
    render() {
        return (
					<nav className="navbar">
						<a href="/" className="navbar-brand">Osteria Italia</a>
						<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
    					<span></span>
							<span></span>
							<span></span>
  					</button>

						<div className="collapse navbar-collapse" id="navbarTogglerDemo01">
							<ul className="navbar-nav mr-auto">
								<li className="nav-item"><Link to={'/menu'} className="nav-link">Menu</Link></li>
								<li className="nav-item"><Link to={'/booking'} className="nav-link">Reservations</Link></li>
								<li className="nav-item"><Link to={'/about'} className="nav-link">About</Link></li>
							</ul>
					</div>
				</nav>
        )
    }
}
export default Nav;
