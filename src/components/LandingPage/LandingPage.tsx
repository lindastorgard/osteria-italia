import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.scss';


class LandingPage extends Component <{}, {}>{
 
  render() {
    return (
      <div>
        <div className="parallax-one">
          <div className="caption-container">
            <span className="caption">
              fifteen tables in the heart of rome
            </span>   
          </div>
        </div>
        <section className="text-container">
          <h3>taste the difference</h3>
          <p>Osteria Italia, a three-Michelin-star restaurant based in Rome, Italy.</p>
          <p>Italian hospitality is in the details, the ironed tablecloths and the polished silver.
            It is an ensemble of gestures that define a way of life. The table is where the journey begins</p>
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
export default LandingPage;