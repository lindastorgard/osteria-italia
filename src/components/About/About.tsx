import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './About.scss';

class About extends Component <{}, {}>{
  
  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {

    return (
      <div>
        <div className="parallax-seven">
          <div className="caption-container">
            <span className="about-caption">
              <p className="sub-text">Salita dei Crescenzi, 31</p>
              <h2>Osteria Italia</h2> 
              <p className="sub-text">Rome</p>
            </span>   
          </div>
        </div>
        <section className="text-container">
          <h3 className="section-title">About</h3>
            <div className="ingress">
              At Osteria Italia we offer a contemporary Italian restaurant experience
              far from the traditional fine dining concept. 
              The relaxed living room ambiance that has become our trademark is a big part of your dinner.
              We are inspired by all the great cooking you can find around the world but the base of our cooking is
              founded in our Italian heritage. ”The purity of the produce, the richness of the details” 
              is the mantra and the essence of our cuisine.
            </div>

            <div className="socialContainer">
              <div className='contact-container'>
                <a href="#">
                  <img className="social-icon" src="/Images/clock.png" alt="facebook icon"/>
                </a>
                <p>Tuesday - Saturday from 17:30 (5:30pm)</p>
                <p>Sunday - Monday closed)</p>
              </div>
              <div className='contact-container'>
                <a href="#">
                  <img className="social-icon" src="/Images/location.png" alt="instagram icon"/>
                </a>
                <p>Salita dei Crescenzi, 31,</p> 
                <p>00186 Roma RM, Italy</p>
              </div>
              <div className='contact-container'>
                <a href="#">
                  <img className="social-icon" src="/Images/contact.png" alt="instagram icon"/>
                </a>
                <p>Email: info@osteriaintalia.com</p>
                <p>Phone from 10.00 am to 6.30 pm</p> 
                <p>Restaurant: +39 059 223912</p> 
                <p>Office: +39 059 220286</p> 
              </div>
					  </div>
        </section>
        
        <div className="parallax-eight"></div>
        <section className="text-container">
          <Link to={'/booking'} className="nav-link">
            <button className="primary-btn">reservations</button>
          </Link>  
        </section>
        
     </div>
      
    	)
    }
	}
export default About;