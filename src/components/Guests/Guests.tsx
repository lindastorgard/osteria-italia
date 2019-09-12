import React from 'react';
import './Guests.scss';
import { IBooking } from '../Booking/Booking';

export interface IAddGuestProps{
  theBooking: IBooking;
  onclick(updatedBooking: IBooking): void,
}

class Guests extends React.Component <IAddGuestProps,{}> {
  constructor(props:any){
    super(props);
        
    this.handleInput = this.handleInput.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  handleInput = (event: any) => { 
    let booking = this.props.theBooking;
    booking.guests = parseInt(event.target.value);
    booking.view = this.props.theBooking.view + 1;

    this.props.onclick(booking);
  }

  render() {

    return (
      <main className="guest-page-container">
        <div className="guest-parent">
          <h1>Select guests</h1>
          <section className="guest-child">
            <button onClick={this.handleInput} className="guest-guestbox" value="1">1</button>
            <button onClick={this.handleInput} className="guest-guestbox" value="2">2</button>
            <button onClick={this.handleInput} className="guest-guestbox" value="3">3</button>
            <button onClick={this.handleInput} className="guest-guestbox" value="4">4</button>
            <button onClick={this.handleInput} className="guest-guestbox" value="5">5</button>
            <button onClick={this.handleInput} className="guest-guestbox" value="6">6</button>
            <button onClick={this.handleInput} className="guest-guestbox" value="7">7</button>
            <button onClick={this.handleInput} className="guest-guestbox" value="8">8</button>
            <button onClick={this.handleInput} className="guest-guestbox" value="9">9</button>
            <button onClick={this.handleInput} className="guest-guestbox" value="10">10</button>    
          </section>
          <p className="paragraph-one">Please select amount of guests.</p>
          <p className="paragraph-two">If you wish to book a table for more than 10 people, please contact us at info@osteriaintalia.com</p>
        </div>
      </main>
    )
  }
}
export default Guests;
