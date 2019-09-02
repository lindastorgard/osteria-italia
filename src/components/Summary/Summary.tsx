import React, { MouseEvent } from 'react';
import './Summary.scss';
import Booking, { IBooking } from '../Booking/Booking';

export interface ISummaryProps{
    theBooking: IBooking;
    onclick(updatedBooking: IBooking): void,
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
                <main className="timePageContainer">
                <div className="timeParentTopSection">
                <h1>Booking Summary</h1>
                    <section>
                        <div className="timeChildTopSection">
                            <button className="timeTopSection" onClick={this.handleInput} value="1">Guests</button>
                            <button className="timeTopSection">{this.props.theBooking.guests}</button>
                        </div>

                        <div className="timeChildTopSection">
                        <button className="timeTopSection" onClick={this.handleInput} value="2">Date</button>
                            <button className="timeTopSection">{this.props.theBooking.date.toLocaleDateString()}</button>
                        </div>

                        <div className="timeChildTopSection">
                        <button className="timeTopSection" onClick={this.handleInput} value="3">Time</button>
                            <button className="timeTopSection">{this.props.theBooking.time}</button>
                        </div>
                        <div className="timeChildTopSection">
                        <button className="timeTopSection" onClick={this.handleInput} value="4">Profile</button>
                            <p className="timeTopSection">{this.props.theBooking.profile.firstName}</p>
                            <p className="timeTopSection">{this.props.theBooking.profile.lastName}</p>
                            <p className="timeTopSection">{this.props.theBooking.profile.email}</p>
                            <p className="timeTopSection">{this.props.theBooking.profile.phone}</p>
                        </div>
                    </section>
                </div>
            </main>
        )
    }
}

export default Summary;
