import React, { MouseEvent } from 'react';
import './Summary.scss';
import Booking, { IBooking } from '../Booking/Booking';
import moment from "moment";

export interface ISummaryProps{
  theBooking: IBooking;
  makesubmit(): void
}

class Summary extends React.Component <ISummaryProps, {}>{
  constructor(props:any){
    super(props);

  }

  render() {
    return (
      <main className="sum-page-container">
        <section className="sum-parent-top-section">
          <h1>Booking Summary</h1>
          <div className="sum-child-top-section">
            <div className="sum-top-section-black">{this.props.theBooking.profile.firstName} {this.props.theBooking.profile.lastName}</div>
            <div className="sum-top-section-black">{this.props.theBooking.profile.phone}</div>
          </div>
          <div className="sum-child-top-section">
            <div className="sum-top-section-black">{moment(this.props.theBooking.date).format('YYYY-MM-DD')} {this.props.theBooking.time}</div>
            <div className="sum-top-section-black">{this.props.theBooking.guests} guests</div>
          </div>
        </section>
        <button className="primary-btn" onClick={this.props.makesubmit}>CONFIRM RESERVATION</button>
      </main>
    )
  }
}

export default Summary;
