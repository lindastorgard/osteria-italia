import React, { Component } from 'react';
import { bool, string } from 'prop-types';
import Calender from '../Calender/Calender';
import Summary from '../Summary/Summary';
import axios from 'axios';

import Confirmation from '../Confirmation/Confirmation';
import Profile, { IAddProfileState } from '../Profile/Profile'
import Guests from '../Guests/Guests'
import Time from '../Time/Time';
import { any } from 'prop-types';



export interface IBooking{
  view: number,
  guests: number,
  date: Date,
  time: string,
  customerId: number,
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
          date: new Date(),
          time: '',
          customerId: 0,
          profile: {
            firstName:'',
            lastName: '',
            email: '',
            phone: '',
            firstNameError: '',
            lastNameError: '',
            emailError: '',
            phoneError: '',
            showFirstNameError: false,
            showLastNameError: false,
            showEmailError: false,
            showPhoneError: false,
            myBookings: [{
            id: 0, 
            customer_id: 0,
            guest_nr: 0, 
            date: '', 
            firstname: '', 
            lastname: '', 
            email: '', 
            phone: ''}],
          myCustomers: [{
            id: 0,
            firstName: '',
            lastname: '',
            email: '',
            phone: ''}]
          }        
        }
			};
			
      this.updateState = this.updateState.bind(this);
      this.makeBooking = this.makeBooking.bind(this);
  }


    // Handle fields change
    updateState(updatedBooking: IBooking) {
      this.setState({
      	booking: updatedBooking
      });
    }

    // make booking
    makeBooking = () => {
      axios.post('http://localhost:8888/booking_api/api/bookings/createBooking.php', {
      	customer_id: this.state.booking.customerId,
      	guest_nr: this.state.booking.guests,
      	date: this.state.booking.date
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

        case 2:
          return(
            <div>
              <Calender onDayClick={this.updateState} theBooking={this.state.booking}/>
            </div>
          )

        case 3:
          return(
            <div>
              <Time onclick={this.updateState} theBooking={this.state.booking}/>
            </div>
          )

        case 4:
          return(
            <div>
              <Profile onsubmit={this.updateState} onclick={this.updateState} theBooking={this.state.booking}/>
            </div>
          )


        case 5:
          return(
            <div>
              <Summary onclick={this.updateState} makesubmit={this.makeBooking} theBooking={this.state.booking}/>
            </div>
          )
    	}
  	}
	}
export default Booking;
