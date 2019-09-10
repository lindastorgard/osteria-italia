import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Menu extends Component <{}, {}>{
 
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
          <p>Osteria Italia is both fast and slow: a contemporary and traditional kitchen at the same time. This tasting menu changes according to our latest kitchen research.</p>
        </section>
        <div className="parallax-two"></div>
        <section className="text-container">
          <h3>italian culinary traditions</h3>
          <p>Our kitchen is not a list of ingredients or demonstration of technical abilities. It is a narration of the Italian landscape and our passions.
            Cooking is a collision of ideas, techniques, and cultures. It is not mathematical. It is emotional.
          </p>
          
          <Link to={'/menu'} className="nav-link">
            <button className="primary-btn">menu</button>
          </Link>
        </section>
        <div className="parallax-three"></div>
        <section className="text-container">
          <h3>ARTWORK IS A LANDSCAPE OF IDEAS</h3>
          <p>Every object reveals a layer of meaning. Contemporary art is an inspiration, a guide and a muse.
              From Maurizio Cattelan to Damien Hirst to Duane Hanson, art is an invitation to discover.
          </p>
          
          <Link to={'/booking'} className="nav-link">
            <button className="primary-btn">reservations</button>
          </Link>
        </section>
        
     </div>
      
    	)
    }
	}
export default Menu;