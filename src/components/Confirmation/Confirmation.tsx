import React, { Component } from 'react';
import './Confirmation.scss';

class Confirmation extends Component <{}, {}> {
  render() {
    return (
      <main className="conf-page-container">
        <div className="conf-parent">
          <h1>Confirmation</h1>
          <section className="conf-child">
            <p className="conf-text-top">Thank you for your booking! Please contact us @08-234 3456 if you wish to make any changes to your booking.
            </p>
            {/* <p className="conf-text-top">Please contact us @08-234 3456 if you wish to make any changes to your booking.</p> */}
          </section>
        </div>
      </main>
    )
  }
}

export default Confirmation;
