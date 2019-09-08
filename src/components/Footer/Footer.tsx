import React, { Component } from 'react';
import './Footer.scss';

class Footer extends Component <{}, {}> {
    render() {
        return (
            <body>
                <div className='footer'>
                <div className='footerSocial'>Facebook</div>
                <div className='footerSocial'>Instagram</div>
                <div className='footerInfo'>Piazza Italiano 5, 55599, Italia</div>
            </div>
            </body>
        )
    }
}
export default Footer;
