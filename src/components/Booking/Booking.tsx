import React, { Component } from 'react';
import Calender from '../Calender/Calender';
import Summary from '../Summary/Summary';
import axios from 'axios';
import Confirmation from '../Confirmation/Confirmation';
import Profile, { IAddProfileState } from '../Profile/Profile';
import Guests from '../Guests/Guests'
import Time from '../Time/Time';
import moment from "moment";

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
            checkboxError: '',
            showFirstNameError: false,
            showLastNameError: false,
            showEmailError: false,
            showPhoneError: false,
            showCheckboxError: false,
            checked: false,
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
      this.handleView = this.handleView.bind(this);
  }

  // scroll to the top of the page when clicked to through link
  componentDidMount() {
    window.scrollTo(0, 0)
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
      	customer_id: parseInt(this.state.booking.customerId.toString()),
      	guest_nr: this.state.booking.guests,
      	date: moment(this.state.booking.date).format('YYYY-MM-DD') + ' ' + this.state.booking.time
      },
          // https://stackoverflow.com/questions/48255545/axios-getting-two-requests-options-post
          // Important to not remove this header due to ajax making cross domain reqs which will break our integration
          {
            headers: {
              'Content-Type': 'text/plain'
            }
          })
        .then(response => {
          console.log(response.data.message);
          this.handleView();
          
      	})
        	.catch(error => console.log(error.data.message));
    };

    handleView(){
      let booking = this.state.booking;
      booking.view = this.state.booking.view + 1;
      console.log(booking.view);
      this.updateState(booking);
    }

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
              <Calender onDayClick={this.updateState} onclick={this.updateState} theBooking={this.state.booking}/>
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
              <Summary makesubmit={this.makeBooking} onclick={this.updateState} theBooking={this.state.booking}/>
              {/* onclick={this.updateState} */}
            </div>
          )
        
        case 6:
          return(
            <div>
              <Confirmation/>
            </div>
          )
    	}
  	}
	}
export default Booking;
