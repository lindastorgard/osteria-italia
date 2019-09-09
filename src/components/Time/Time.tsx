import React from 'react';
import {IBooking} from '../Booking/Booking';
import {IExistingBoooking} from '../Calender/Calender';
import moment from 'moment/moment.js'
import './Time.scss';

const axios = require('axios');

export interface IBookedUpTime {
  earlyBooking: number,
  lateBooking: number,
}

export interface ITimeState {
  bookedTimes: IBookedUpTime;
  existingBookings: IExistingBoooking[],
}

export interface IAddTimeProps {
  theBooking: IBooking;

  onclick(updatedBooking: IBooking): void,
}

class Time extends React.Component <IAddTimeProps, ITimeState> {
  constructor(props: any) {
    super(props);
    this.state = {
      bookedTimes: {
        earlyBooking: 0,
        lateBooking: 0,
      },
      existingBookings: [],
    };

    this.disableBookedUpTimes = this.disableBookedUpTimes.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleView = this.handleView.bind(this);
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    axios.get('http://localhost:8888/booking_api/api/bookings/read.php')
      .then((response: any) => {
        this.setState({
          existingBookings: response.data.data
        });

        if (this.state.existingBookings == undefined){
          console.log('got ya');
          this.setState({
            bookedTimes: {
              earlyBooking: 15,
              lateBooking: 15
            }
          })
          return
        }else{
          console.log("Existing from state: ", this.state.existingBookings);
          this.disableBookedUpTimes();
        }
      })
    }

  disableBookedUpTimes() {
    // Iterate over the reservations and compare the date from the database with the chosen date
    // Every time you find a reservation for that date and time, decrease available times with 1
    let earlyTime = '18:00';
    let lateTime = '21:00';
    let availableEarlyTimes = 15;
    let availableLateTimes = 15;

    this.state.existingBookings.map(booking => {
		let dbDate = new Date(booking.date);
		let guestNr = booking.guest_nr;
      if (dbDate.toDateString() === this.props.theBooking.date.toDateString()) {
        // Format the date from the database to only show the chosen time for the reservation
        let dbTime = moment(dbDate).format('HH:mm');
        if (earlyTime === dbTime) {
          console.log("Early");
          //Check if booking contains more than 7 guests, if yes deduct 2 tables for that booking
          (guestNr < 7 ? availableEarlyTimes-= 1 : availableEarlyTimes -= 2);
          console.log("nr of available table ",availableEarlyTimes)
        }

        if (lateTime === dbTime) {
          console.log("late");
          (guestNr < 7 ? availableEarlyTimes-= 1 : availableEarlyTimes -= 2);
          console.log("nr of available table ",availableLateTimes)
        }
      }
    });
    this.setState({
      bookedTimes: {
        earlyBooking: availableEarlyTimes,
        lateBooking: availableLateTimes
      }
    })
  }

  hasNoAvailableTimes(time: number) {
    return time <= 0;
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

    return (
      <main className="timePageContainer">
        <section className="profileParentTopSection">
          <div className="profileChildTopSection">
            <button className="profileTopSection" onClick={this.handleView} value="1">Guests</button>
            <button className="profileTopSection">{this.props.theBooking.guests}</button>
          </div>
          <div className="profileChildTopSection">
            <button className="timeTopSection" onClick={this.handleView} value="2">Date</button>
            <button className="timeTopSection">{this.props.theBooking.date.toLocaleDateString()}</button>
          </div>
        </section>
        <div className="timeParent">
          <h1>Select time</h1>
          <section className="timeChild">
            <button
              onClick={this.handleInput}
              disabled={this.hasNoAvailableTimes(this.state.bookedTimes.earlyBooking)}
              className="timebox" value="18:00">18:00
            </button>
            <button
              onClick={this.handleInput}
              disabled={this.hasNoAvailableTimes(this.state.bookedTimes.lateBooking)}
              className="timebox" value="21:00">21:00
            </button>
          </section>
        </div>
      </main>
    )
  }
}

export default Time;
