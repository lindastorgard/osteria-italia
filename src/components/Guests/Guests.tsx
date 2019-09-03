import React, { Component } from 'react';
import './Guests.scss';
import Booking, { IBooking } from '../Booking/Booking';

export interface IAddGuestProps{
    theBooking: IBooking;
    onclick(updatedBooking: IBooking): void,
}

class Guests extends React.Component <IAddGuestProps,{}> {
    constructor(props:any){
        super(props);
        
        this.handleInput = this.handleInput.bind(this);
    }

    handleInput = (event: any) => { 
        let booking = this.props.theBooking;
        booking.guests = parseInt(event.target.value);
        booking.view = this.props.theBooking.view + 1;

        this.props.onclick(booking);
    }

    render() {

        return (
            <main className="pageContainer">
                <section className="parentTopSection">
                    <div className="childTopSection">
                        <button className="topSection">Guests</button>
                        <button className="topSection">{this.props.theBooking.guests}</button>
                    </div>
                </section>
                <div className="parent">
                <h1>Select guests</h1>
                <section className="child">
                    <button onClick={this.handleInput} className="guestbox" value="1">1</button>
                    <button onClick={this.handleInput} className="guestbox" value="2">2</button>
                    <button onClick={this.handleInput} className="guestbox" value="3">3</button>
                    <button onClick={this.handleInput} className="guestbox" value="4">4</button>
                    <button onClick={this.handleInput} className="guestbox" value="5">5</button>
                    <button onClick={this.handleInput} className="guestbox" value="6">6</button>
                    <button onClick={this.handleInput} className="guestbox" value="7">7</button>
                    <button onClick={this.handleInput} className="guestbox" value="8">8</button>
                    <button onClick={this.handleInput} className="guestbox" value="9">9</button>
                    <button onClick={this.handleInput} className="guestbox" value="10">10</button>    
                </section>
                <p>Donut chocolate cake I love jelly marzipan gummi bears I love ice cream. Chocolate cake pie toffee chocolate cake topping candy canes apple pie. I love pie powder.</p>
                </div>
            </main>
        )
    }
}
export default Guests;
