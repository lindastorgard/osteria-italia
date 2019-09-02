import React, { Component } from 'react';
import './Time.scss';
import { IBooking } from '../Booking/Booking';

export interface IAddTimeProps{
    theBooking: IBooking;
    onclick(updatedBooking: IBooking): void,
}

class Time extends React.Component <IAddTimeProps,{}> {
    constructor(props:any){
        super(props);
        
        this.handleInput = this.handleInput.bind(this);
    }

    handleInput = (event: any) => { 
        let booking = this.props.theBooking;
        booking.time = event.target.value;
        booking.view = this.props.theBooking.view + 1;

        this.props.onclick(booking);
    }

    render() {

        return (
            <main className="timePageContainer">
                <div className="timeParentTopSection">
                    <section>
                        <div className="timeChildTopSection">
                            <p className="timeTopSection">Guests</p>
                            <p className="timeTopSection">{this.props.theBooking.guests}</p>
                        </div>
                        <div className="timeChildTopSection">
                            <p className="timeTopSection">Date</p>
                            <p className="timeTopSection">{this.props.theBooking.date}</p>
                        </div>
                        <div className="timeChildTopSection">
                            <p className="timeTopSection">Time</p>
                            <p className="timeTopSection">{this.props.theBooking.time}</p>
                        </div>
                    </section>
                </div>
                <div className="timeParent">
                <h1>Select time</h1>
                <section className="timeChild">
                    <button onClick={this.handleInput} className="timebox" value="18:00">18:00</button>
                    <button onClick={this.handleInput} className="timebox" value="21:00">21:00</button> 
                </section>
                </div>
            </main>
        )
    }
}
export default Time;