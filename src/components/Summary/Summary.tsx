import React  from 'react';
import './Summary.scss';
import { IBooking } from '../Booking/Booking';
import moment from "moment";

export interface ISummaryProps{
  theBooking: IBooking;
  onclick(updatedBooking: IBooking): void,
  makesubmit(): void
}

class Summary extends React.Component <ISummaryProps, {}>{
  constructor(props:any){
    super(props);

    this.handleBackStep = this.handleBackStep.bind(this);
  }
  
  componentDidMount() {
    window.scrollTo(0, 0)
  }

  handleBackStep(){
    let booking = this.props.theBooking;
    booking.view = this.props.theBooking.view - 1;

    this.props.onclick(booking);
  }

  render() {
    return (
      <main className="sum-page-container">
        <section className="sum-parent-top-section">
        <button className="back-button" onClick={this.handleBackStep}><img className="back-icon" src="/Images/back-button.png" alt="previous button"/></button>
        <div className="sum-child-top-section"></div>
          <h1>Booking Summary</h1>
          <div className="sum-child-top-section">
            <div className="sum-top-section">{this.props.theBooking.profile.firstName} {this.props.theBooking.profile.lastName}</div>
            <div className="sum-top-section">{this.props.theBooking.profile.phone}</div>
          </div>
          <div className="sum-child-top-section">
            <div className="sum-top-section-two">{moment(this.props.theBooking.date).format('YYYY-MM-DD')} {this.props.theBooking.time}</div>
            <div className="sum-top-section-two">{this.props.theBooking.guests} guests</div>
          </div>
        </section>
        <button className="primary-btn" onClick={this.props.makesubmit}>CONFIRM RESERVATION</button>
      </main>
    )
  }
}

export default Summary;
