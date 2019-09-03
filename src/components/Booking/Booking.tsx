import React, { Component } from 'react';

import { bool, string } from 'prop-types';
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
                    phone: '',
                    firstNameError: '',
                    lastNameError: '',
                    emailError: '',
                    phoneError: ''
                }
                
            }
            
        };
        this.updateState = this.updateState.bind(this);

    }


    // Handle fields chenge
    updateState(updatedBooking: IBooking) {
        this.setState({
            booking: updatedBooking
        });
    }

   

  render() {
   
    switch(this.state.booking.view){
        case 1:
                return(
                    <div>
                         {/* {this.state.booking.view}; */}
                        <Guests onclick={this.updateState} theBooking={this.state.booking}/>
                    </div>
                )
        
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
        
        case 5:
                return(
                    <div>
                        <Summary/>
                        {/* <Summary onclick={this.updateState} theBooking={this.state.booking}/> */}
                    </div>
                )

    }
  }
}
export default Booking;