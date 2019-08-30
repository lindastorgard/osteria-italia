import React, { Component } from 'react';
import './Profile.scss';
import { IBooking } from '../Booking/Booking';


export interface IAddProfileProps{
    theBooking: IBooking;
    onchange(updatedBooking: IBooking): void,
}

class Profile extends React.Component <IAddProfileProps,{}> {
    constructor(props:any){
        super(props);
        
        this.handleInput = this.handleInput.bind(this);
    }

    handleInput = (event: any) => { 
        let booking = this.props.theBooking;
        booking.profile = event.target.value;

        this.props.onchange(booking);
    }

    render() {

        return (
            <main className="profilePageContainer">
                <div className="profileParent">
                <h1>Your details</h1>
                <form onChange={this.handleInput} className="profileChild">
                    <input  className="profilebox" type="name" placeholder="Firstname"></input>
                    <input  className="profilebox" type="lastname" placeholder="Lastname"></input>
                    <input  className="profilebox" type="email" placeholder="Email"></input>
                    <input  className="profilebox" type="phone" placeholder="Phone"></input>
                </form>
                </div>
            </main>
        )
    }
}
export default Profile;