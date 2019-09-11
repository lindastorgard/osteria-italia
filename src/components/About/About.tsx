import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './About.scss';

class Menu extends Component <{}, {}>{
  
  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {

    return (
      <div>
        <div className="parallax-four">
          <div className="caption-container">
            <span className="caption">
              a bite of divinity
            </span>   
          </div>
        </div>
        <section className="text-container">
          <h3>Tasting menu</h3>
          <div className="menu-courses-container">
            <div className="ingress">Osteria Italia is both fast and slow: a contemporary and traditional kitchen at the same time. This tasting menu changes according to our latest kitchen research.</div>
          </div>  
        </section>
        
        <div className="parallax-six"></div>
        <section className="text-container">
          <Link to={'/booking'} className="nav-link">
            <button className="primary-btn">reservations</button>
          </Link>
        </section>
        
     </div>
      
    	)
    }
	}
export default Menu;