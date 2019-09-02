import React, { Component } from 'react';
import './Profile.scss';
import { IBooking } from '../Booking/Booking';

export interface IAddProfileState{
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}

export interface IAddProfileProps{
    theBooking: IBooking;
    onsubmit(updatedBooking: IBooking): void,
}

class Profile extends React.Component <IAddProfileProps,IAddProfileState> {
    constructor(props:any){
        super(props);
        
        this.handleInput = this.handleInput.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInput = (event: any) => { 
        event.preventDefault();
        let booking = this.props.theBooking;
        booking.profile = this.state;
        booking.view = this.props.theBooking.view + 1;

        this.props.onsubmit(booking);
    }

    handleInputChange(event:any) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        
        this.setState({
          [name]: value
        } as any);
      }

    render() {

        return (
            <main className="profilePageContainer">
                 <div className="profileParentTopSection">
                    <section>
                    <div className="profileChildTopSection">
                            <button className="profileTopSection" onClick={this.handleInput} value="1">Guests</button>
                            <button className="profileTopSection">{this.props.theBooking.guests}</button>
                        </div>

                        {/* Open for date when ready - change all values!!!! */}
                        {/* <div className="timeChildTopSection">
                        <button className="timeTopSection" onClick={this.handleInput} value="2">Date</button>
                            <button className="timeTopSection">{this.props.theBooking.date}</button>
                        </div> */}

                        <div className="profileChildTopSection">
                        <button className="profileTopSection" onClick={this.handleInput} value="2">Time</button>
                            <button className="profileTopSection">{this.props.theBooking.time}</button>
                        </div>
                    </section>
                </div>
                <div className="profileParent">
                <h1>Your details</h1>
                <form onSubmit={this.handleInput} className="profileChild">
                    <input name="firstName" className="profilebox" type="name" placeholder="Firstname" onChange={this.handleInputChange}></input>
                    <input name="lastName" className="profilebox" type="lastname" placeholder="Lastname" onChange={this.handleInputChange}></input>
                    <input name="email" className="profilebox" type="email" placeholder="Email" onChange={this.handleInputChange}></input>
                    <input name="phone" className="profilebox" type="phone" placeholder="Phone" onChange={this.handleInputChange}></input>
                    <input type="submit" value="Submit" />
                </form>
                </div>
            </main>
        )
    }
}
export default Profile;