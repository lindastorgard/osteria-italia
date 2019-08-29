import React, { Component } from 'react';
// import Profile from '../Profile/Profile'
import Guests from '../Guests/Guests'
// import Date from '../Date/Date'
// import Time from '../Time/Time'
// import Summary from '../Summary/Summary'
// import Confirmation from '../Confirmation/Confirmation';

export interface IBooking{
    // step: string,
    guests: string,
    date: string,
    time: string
}

interface IBookingState {
    booking: IBooking[];
}

class Booking extends Component <{}, IBookingState> {

    constructor(props:any){
        super(props);

        // set booking state
        this.state = { 
            booking: [
                { guests: '', date: '', time: ''}
            ]
        };
        this.updateState = this.updateState.bind(this);
        // this.nextStep = this.nextStep.bind(this);
        // this.previousStep = this.previousStep.bind(this);
    }


    // Handle fields chenge
    updateState (newGuest: string) {
        this.setState({
            booking:[...this.state.booking, { guests: newGuest, date: '', time: ''}]
    });
    }

  

  render() {
    
    //   switch(step){
    //       case 1:
              return(
                  <div>
                      <Guests onClick={this.updateState}/>
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