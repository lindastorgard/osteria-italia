import React from 'react';
import { IBooking } from '../Booking/Booking';
import { IExistingBoooking } from '../Calender/Calender';
import moment from 'moment/moment.js' 
import './Time.scss';

const axios = require ('axios');

export interface IBookedUpTime{
  earlyBooking: boolean,
  lateBooking: boolean,
}

export interface ITimeState{
	bookedTimes: IBookedUpTime;
	existingBookings: IExistingBoooking[],
}

export interface IAddTimeProps{
  theBooking: IBooking;
	onclick(updatedBooking: IBooking): void,
}

class Time extends React.Component <IAddTimeProps, ITimeState> {
  constructor(props:any){
		super(props);
		this.state = {
			bookedTimes: {
				earlyBooking: false,
				lateBooking : true,  
			},
			existingBookings: [],
		}
		 
		this.disableBookedUpTimes = this.disableBookedUpTimes.bind(this);
    this.handleInput = this.handleInput.bind(this);
		this.handleView = this.handleView.bind(this);
		this.getData = this.getData.bind(this);
	}

	componentDidMount() {
		this.getData();
		this.disableBookedUpTimes();
  }

  getData(){
    axios.get('http://localhost:8888/booking_api/api/bookings/read.php')
      .then((response:any) => {
        this.setState({
          existingBookings: response.data.data 
        });
      console.log("Existing from state: ", this.state.existingBookings);
    })
  }
		
	disableBookedUpTimes(){
		let selectedDate = moment(this.props.theBooking.date).format('YYYY-MM-DD')
		
		console.log("This is the day for current booking", selectedDate);
		this.state.existingBookings.map(currentBooking => {
			console.log(currentBooking.date)
		})
		 
	// 		this.getDatesWithBookings();
	// 		this.state.daysWithBooking.map(day => {
	// 			if(day.sittings.sitting1 === 15 && !(day.sittings.sitting2 === 15)){
	// 				console.log("you cannot booke table at 18 00 on ", day.bookedDate);
	// 				this.setState({
	// 					bookedTimes:{
	// 						earlyBooking: true,
	// 						lateBooking: false
	// 					}
	// 				})
	// 			} else if(day.sittings.sitting2 === 15 && !(day.sittings.sitting1 === 15))
	// 				console.log("you cannot booke table at 18 00 on ", day.bookedDate);
	// 				this.setState({
	// 					bookedTimes:{
	// 						earlyBooking: false,
	// 						lateBooking: true
	// 					}
	// 				})
	// 		})  
	}

  handleInput = (event: any) => { 
  	let booking = this.props.theBooking;
  	booking.time = event.target.value;
  	booking.view = this.props.theBooking.view + 1;

  	this.props.onclick(booking);
  }

  handleView = (event: any) => {
  	let booking = this.props.theBooking;
  	booking.view = parseInt(event.target.value);

  	this.props.onclick(booking);
  }

    render() {

      if(this.props.theBooking.time){
        return (
          <main className="timePageContainer">
            <section className="timeParentTopSection">
              <div className="timeChildTopSection">
                <button className="timeTopSection" onClick={this.handleView} value="1">Guests</button>
                <button className="timeTopSection">{this.props.theBooking.guests}</button>
              </div>

							<div className="timeChildTopSection">
                <button className="timeTopSection" onClick={this.handleInput} value="2">Date</button>
                <button className="timeTopSection">{this.props.theBooking.date.toLocaleDateString()}</button>
              </div>

            </section>
              <div className="timeParent">
              <h1>Select time</h1>
              <section className="timeChild">
                  <button onClick={this.handleInput} className="timebox" value="18:00">18:00</button>
                  <button onClick={this.handleInput} className="timebox" value="21:00">21:00</button> 
              </section>
              </div>
          </main>
        )
      }else{
        return (
            <main className="timePageContainer">
                <div className="timeParentTopSection">
                    <section>
                    <div className="timeChildTopSection">
                            <button className="timeTopSection" onClick={this.handleInput} value="1">Guests</button>
                            <button className="timeTopSection">{this.props.theBooking.guests}</button>
                        </div>

                        <div className="timeChildTopSection">
                        	<button className="timeTopSection" onClick={this.handleInput} value="2">Date</button>
                          <button className="timeTopSection">{this.props.theBooking.date.toLocaleDateString()}</button>
                        </div>
                    </section>
                </div>
                <div className="timeParent">
                <h1>Select time</h1>
                <section className="timeChild">
                    <button onClick={this.handleInput} className="timebox" value="18:00">18:00</button>
                    <button onClick={this.handleInput} className="timebox" value="21:00">21:00</button> 
                </section>
                </div>
            </main>

        )
      } 
    }
}
export default Time;