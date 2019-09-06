import React, { Component } from 'react';
import { bool, string } from 'prop-types';
import axios from 'axios';
import Date from '../Date/Date'
import Summary from '../Summary/Summary'
import Confirmation from '../Confirmation/Confirmation';
import Profile, { IAddProfileState } from '../Profile/Profile'
import Guests from '../Guests/Guests'
import Time from '../Time/Time';
import { any } from 'prop-types';


export interface IBooking{
  view: number,
  guests: number,
  date: string,
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
        date: '',
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

  // Handle fields chenge
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
      date: "2019-08-05 18.00.00"
    })
    .then(response => {
      console.log(response.data.message);
      })
    .catch(error => console.log(error.data.message));
      console.log("5: booking created with customer_id: ", this.state.booking.customerId )
  }

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
            <Profile onsubmit={this.updateState} onclick={this.updateState} theBooking={this.state.booking}/>
          </div>
        )
        
      case 4:
        return(
          <div>
            <Summary onclick={this.updateState} makesubmit={this.makeBooking} theBooking={this.state.booking}/> 
          </div>
        )

    }
  }
}
export default Booking;