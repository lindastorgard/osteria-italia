import React from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import moment from 'moment/moment.js' 

import { IBooking } from '../Booking/Booking';
import './Calender.scss';

const axios = require ('axios');

export interface IExistingBoooking{
  id: number,
  customer_id: number,
  guest_nr: number,
  date: Date
}


export interface ICalenderState{
  disabledDays: [],
  existingBookings: IExistingBoooking[],
  // occupiedTables: number
  
}

interface ICalenderProps{
  theBooking: IBooking,
  onDayClick(updatedBooking: IBooking): void;
}

class Calender extends React.Component <ICalenderProps, ICalenderState> {
  constructor(props: any) {
    super(props);
    this.state = {
      existingBookings : [],
      disabledDays: [],
      // occupiedTables: 0
    }

    this.handleDayClick = this.handleDayClick.bind(this);
    this.getData = this.getData.bind(this);
    this.fetchBookedTables = this.fetchBookedTables.bind(this);

  }

    //Have to get nr of tables occupied selected date
  //loop through bookings, and if nr of guests is bigger than 6, add 2 tables
  //if time is 18:00, add number to earlyEvening array
  //if time is 21:00, add number to lateEvening array
  //if nr of tabels is > 15 in early evening && nr of tabels is > 15 in late evening
  // than set state of the day to disabled

  componentDidMount() {
    this.getData();
  }

  getData(){
    axios.get('http://localhost:8888/booking_api/api/bookings/read.php')
      .then((response:any) => {
        this.setState({
          existingBookings: response.data.data 
        })
      console.log(this.state.existingBookings);
      this.fetchBookedTables();
    })
  }

  // fetchBookedTables(){
  //   let occupiedTables = 0;
  //   this.state.existingBookings.map(currentBooking => {
  //     let time = moment(currentBooking.date).format('hh:mm');
  //     if(currentBooking.guest_nr > 6){

  //       if(time == '06:00'){
  //         console.log('early booking');
  //       }
  //       let tablesPerBooking = 2; 
  //       occupiedTables += tablesPerBooking;
  //     } else if (currentBooking.guest_nr < 6) {
  //       console.log("time is " + time);
  //       let tablesPerBooking = 1; 
  //       occupiedTables += tablesPerBooking;
  //     }
  //   })  
  //   console.log("nr of occupied tables is" + occupiedTables);  
  //   return occupiedTables;
    
  // }

  fetchBookedTables(){
    let earlyOccupiedTables = 0;
    let lateOccupiedTables = 0;
    this.state.existingBookings.map(currentBooking => {
      let time = moment(currentBooking.date).format('hh:mm');
      if(time == '06:00'){
        if(currentBooking.guest_nr > 6){
          let tablesPerBooking = 2; 
          earlyOccupiedTables += tablesPerBooking;
        } else{
          let tablesPerBooking = 1;
          earlyOccupiedTables += tablesPerBooking;
        }      
      } else if (time == '09:00'){
        if(currentBooking.guest_nr > 6){
          let tablesPerBooking = 2; 
          lateOccupiedTables += tablesPerBooking;
        } else{
          let tablesPerBooking = 1;
          lateOccupiedTables += tablesPerBooking;
        }    
      }
    })  
    console.log("nr of occupied tables at 6 pm are " + earlyOccupiedTables);  
    console.log("nr of occupied tables at 9 pm are " + lateOccupiedTables);   
  }
    

  handleDayClick = (day: Date) => {
    let booking = this.props.theBooking;
    console.log('Selected day: ' + day.toLocaleDateString());
    booking.date = day;
    booking.view = this.props.theBooking.view + 1;
    this.props.onDayClick(booking);
}

  render() {

    return (
      <div className="page-container">
        <section>
          <div className="timeChildTopSection">
            <button className="timeTopSection" onClick={()=>this.handleDayClick} value="1">Guests</button>
            <button className="timeTopSection">{this.props.theBooking.guests}</button>
          </div>
        </section>
        <h1>Select date</h1>
        <DayPicker
          onDayClick={this.handleDayClick}
        />
      </div>

      
    )
  }
}
export default Calender;
