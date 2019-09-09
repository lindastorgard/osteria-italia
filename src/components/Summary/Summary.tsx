import React, { MouseEvent } from 'react';
import './Summary.scss';
import Booking, { IBooking } from '../Booking/Booking';
import moment from "moment";

export interface ISummaryProps{
    theBooking: IBooking;
    onclick(updatedBooking: IBooking): void,
    makesubmit(): void
}


class Summary extends React.Component <ISummaryProps, {}>{
    constructor(props:any){
        super(props);

        this.handleInput = this.handleInput.bind(this);
    }

    handleInput = (event: any) => {
        let booking = this.props.theBooking;
        booking.view = parseInt(event.target.value);

        this.props.onclick(booking);
    }

    render() {
        return (
          <main className="summaryPageContainer">
            <section className="summaryParentTopSection">
              <h1>Booking Summary</h1>
                <div className="summaryChildTopSection">
                  <div className="summaryTopSection">{this.props.theBooking.profile.firstName} {this.props.theBooking.profile.lastName}</div>
                  <div className="summaryTopSection">{this.props.theBooking.profile.phone}</div>
                </div>
                <div className="summaryChildTopSection">
                  <div className="summaryTopSection">{moment(this.props.theBooking.date).format('YYYY-MM-DD')} {this.props.theBooking.time}</div>
                  <div className="summaryTopSection">{this.props.theBooking.guests}</div>
                </div>
              </section>
              <button onClick={this.props.makesubmit}>CONFIRM RESERVATION</button>

            </main>
        )
    }
}

export default Summary;
