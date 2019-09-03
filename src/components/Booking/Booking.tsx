import React, { Component } from 'react';
import axios from 'axios';
import { bool } from 'prop-types';
import Date from '../Date/Date'
import Summary from '../Summary/Summary'
import Confirmation from '../Confirmation/Confirmation';
import Profile, { IAddProfileState } from '../Profile/Profile'
import Guests from '../Guests/Guests'
import Time from '../Time/Time';
import { any } from 'prop-types';

// const axios = require ('axios');


export interface IBooking{
    view: number,
    guests: number,
    date: string,
    time: string,
    profile: IAddProfileState
}

interface IBookingState {
    
    booking: IBooking;
}

class Booking extends Component <{}, IBookingState> {

    constructor(props:any){
        super(props);

        // set booking state
        this.state = { 
            
            booking: {
                view: 1,
                guests: 0,
                date: '',
                time: '',
                profile: {
                    firstName:'',
                    lastName: '',
                    email: '',
                    phone: ''
                }
            }
            
        };
        this.updateState = this.updateState.bind(this);
        this.makeBooking = this.makeBooking.bind(this);

    }

    // Handle fields chenge
    updateState(updatedBooking: IBooking) {
        this.setState({
            booking: updatedBooking
        });
    }

    // make booking
    makeBooking = () => {
      axios.post('http://localhost:8888/booking_api/api/bookings/createBooking.php', {
        customer_id: 5,
        guest_nr: this.state.booking.guests,
        date: "2019-08-05 18.00.00"
      })
          .then(response => {
                  console.log(response.data.message);
          })
          .catch(error => console.log(error.data.message));
  };

  render() {
    switch(this.state.booking.view){
        case 1:
                return(
                    <div>
                        <Guests onclick={this.updateState} theBooking={this.state.booking}/>
                    </div>
                )

        // Open when date is done
        // case 2:
        //         return(
        //             <div>
        //                 <Date/>
        //                 {/* <Date onclick={this.updateState} theBooking={this.state.booking}/> */}
        //             </div>
        //         )

        case 2:
                return(
                    <div>
                        <Time onclick={this.updateState} theBooking={this.state.booking}/>
                    </div>
                )
        
        case 3:
                return(
                    <div>
                        <Profile onsubmit={this.updateState} theBooking={this.state.booking}/>
                    </div>
                )
        
        case 4:
                return(
                    <div>
                        <Summary onclick={this.updateState} makesubmit={this.makeBooking} theBooking={this.state.booking}/> 
                        {/* <Summary makesubmit={this.makeBooking} theBooking={this.state.booking}/>  */}
                        {/* <button onClick={this.makeBooking}>klick</button> */}
                    </div>
                )

    }
  }
}
export default Booking;