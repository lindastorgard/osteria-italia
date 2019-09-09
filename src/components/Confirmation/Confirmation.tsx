import React, { Component } from 'react';

class Confirmation extends Component <{}, {}> {
  render() {
    return (
      <main className="pageContainer">
        <div className="parent">
          <h1>Confirmation</h1>
          <section className="child">
            <p>Thank you for your booking!</p>
            <p>Please contact us @08-234 3456 if you wish to make any changes to your booking.</p>
          </section>
        </div>
      </main>
    )
  }
}

export default Confirmation;
