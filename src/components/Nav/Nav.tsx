import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.scss';
import { CSSTransition } from "react-transition-group";

export interface INavState{
  showMenu: boolean
}


class Nav extends React.Component<{}, INavState> {
  constructor(props: any) {
    super(props);
    
    this.state = {
      showMenu: false,
    }
    
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }
  
  showMenu(event: any) {
    event.preventDefault();
    
    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }

  closeMenu() {
    this.setState({ showMenu: false }, () => {
      document.removeEventListener('click', this.closeMenu);
    });
  }

  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Osteria Italia</a>
        <button 
          className="navbar-toggler" 
          type="button" data-toggle="collapse" 
          aria-controls="navbarTogglerDemo01" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
          onClick={this.showMenu}>
          <span></span>
					<span></span>
					<span></span>
        </button>
        <CSSTransition
          in={this.state.showMenu}
          timeout={300}
          classNames="list-transition"
          unmountOnExit
          appear
        >
						<div className="menu navbar-collapse">
              <ul className="navbar-nav mr-auto">
								<li className="nav-item"><Link to={'/menu'} className="nav-link">Menu</Link></li>
								<li className="nav-item"><Link to={'/booking'} className="nav-link">Reservations</Link></li>
								<li className="nav-item"><Link to={'/about'} className="nav-link">About</Link></li>
							</ul>
						</div>
            </CSSTransition>
      </nav>
    );
  }
}
export default Nav;
