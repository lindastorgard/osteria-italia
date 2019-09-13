import React, { Component } from 'react';
import './Confirmation.scss';

class Confirmation extends Component <{}, {}> {

  componentDidMount() {
    window.scrollTo(0, 0)
  }
  
  render() {
    return (
      <main className="conf-page-container">
        <div className="conf-parent">
          <h1>Confirmation</h1>
          <section className="conf-child">
            <p className="conf-text-top">Thank you for your booking!</p>
            <p> Please contact us at info@osteriaintalia.com if you wish to make any changes to your booking.</p>
            <p>We are looking forward hosting you at Osteria Italia!</p>
          </section>
        </div>
      </main>
    )
  }
}

export default Confirmation;
