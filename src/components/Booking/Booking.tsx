import React, { Component } from 'react';
import Guests from '../Guests/Guests'
import Time from '../Time/Time';
import { bool } from 'prop-types';
import Date from '../Date/Date'
import Profile from '../Profile/Profile'
import Summary from '../Summary/Summary'
import Confirmation from '../Confirmation/Confirmation';

export interface IBooking{
    view: number,
    guests: number,
    date: string,
    time: string,
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
                time: ''
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
                        <Profile/>

                        {/* <Profile onclick={this.updateState} theBooking={this.state.booking}/> */}
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
    
      
            //   return(
            //       <div>
            //            {this.state.booking.view};
            //           <Guests onclick={this.updateState} theBooking={this.state.booking}/>
            //           <Time onclick={this.updateState} theBooking={this.state.booking}/>
            //       </div>
            //   )
    //       case 2:
    //           return(
    //               <h1>Date</h1>
    //             //   <Date/>
    //           )
    //   }
  }
}
export default Booking;