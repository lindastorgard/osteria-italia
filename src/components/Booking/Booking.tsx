import React, { Component } from 'react';
import Profile, { IAddProfileState } from '../Profile/Profile'
import Guests from '../Guests/Guests'
import Time from '../Time/Time';
import { any } from 'prop-types';
// import Date from '../Date/Date'
// import Summary from '../Summary/Summary'
// import Confirmation from '../Confirmation/Confirmation';

export interface IBooking{
    // step: string,
    guests: number,
    date: string,
    time: string,
    profile: IAddProfileState
}

interface IBookingState {
    
    booking: IBooking;
    // showDate: boolean;
    // showTime: boolean;
    // showDetails: boolean;
}

class Booking extends Component <{}, IBookingState> {

    constructor(props:any){
        super(props);

        // set booking state

        this.state = { 
            
            booking: {
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
        // this.nextStep = this.nextStep.bind(this);
        // this.previousStep = this.previousStep.bind(this);
    }


    // Handle fields chenge
    updateState(updatedBooking: IBooking) {
        this.setState({
            booking: updatedBooking
        });
    }

  

  render() {
    
    //   switch(step){
    //       case 1:
              return(
                  <div>
                      <Guests onclick={this.updateState} theBooking={this.state.booking}/>
                      <Time onclick={this.updateState} theBooking={this.state.booking}/>
                      <Profile onsubmit={this.updateState} theBooking={this.state.booking}/>
                  </div>
              )
    //       case 2:
    //           return(
    //               <h1>Date</h1>
    //             //   <Date/>
    //           )
    //   }
  }
}
export default Booking;