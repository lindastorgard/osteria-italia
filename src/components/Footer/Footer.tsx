import React, { Component } from 'react';
import './Footer.scss';

class Footer extends Component <{}, {}> {
    render() {
        return (
            <body>
                <div className='footer'>
                <div className='footerSocial'><a href="#">Facebook</a></div>
                <div className='footerSocial'><a href="#">Instagram</a></div>
                <div className='footerInfo'>Piazza Italiano 5, 55599, Italia</div>
            </div>
            </body>
        )
    }
}
export default Footer;
