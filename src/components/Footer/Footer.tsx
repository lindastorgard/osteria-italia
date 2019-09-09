import React, { Component } from 'react';
import './Footer.scss';


class Footer extends Component <{}, {}> {
  render() {
    return (
      <footer>
				<hr></hr>
        <div className='footer'>
					<div className="socialContainer">
						<div className='footerSocial'>
							<a href="#">
								<img className="social-icon" src="/Images/facebook-light.png" alt="facebook icon"/>
							</a></div>
          	<div className='footerSocial'>
							<a href="#">
								<img className="social-icon" src="/Images/instagram-light.png" alt="instagram icon"/>
							</a>
						</div>
					</div>
					
				
          
          <div className='footerInfo'>Piazza Italiano 5, 55599, Italia</div>
					<div className='footerInfo'>www.osteriaitalia.com</div>
        </div>
      </footer>
    )
  }
}
export default Footer;
