import React from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import moment from 'moment/moment.js' 

import { IBooking } from '../Booking/Booking';
import './Calender.scss';

const axios = require ('axios');


export interface IExistingBoooking {
  id: number,
  customer_id: number,
  guest_nr: number,
  date: Date
}

export interface IConfig {
  setting: string,
  value: string
}

export interface IBookingTimes {
  sitting1: number,
  sitting2: number
}

export interface IBookingDay {
  bookedDate: string,
  sittings: IBookingTimes
}

export interface ICalenderState{
  dayWithBooking: IBookingDay,
  daysWithBooking: IBookingDay[],
  existingBookings: IExistingBoooking[],
  configurations: IConfig[],
  disabledDays: Date[],
}

interface ICalenderProps{
  theBooking: IBooking,
  onDayClick(updatedBooking: IBooking): void;
  onclick(updatedBooking: IBooking): void,
}

class Calender extends React.Component <ICalenderProps, ICalenderState> {
  constructor(props: any) {
    super(props);
    this.state = {
      dayWithBooking: {
        bookedDate: '',
        sittings: {
          sitting1: 0,
          sitting2: 0
        }  
      },
      existingBookings : [],
      disabledDays: [],
      daysWithBooking: [],
      configurations: [],
    } 

    this.handleDayClick = this.handleDayClick.bind(this);
    this.getConfigData = this.getConfigData.bind(this);
    this.getData = this.getData.bind(this);
    this.disableBookedUpDays = this.disableBookedUpDays.bind(this);
    this.getDatesWithBookings = this.getDatesWithBookings.bind(this);
    this.handleView = this.handleView.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  getData(){
    axios.get('http://localhost:8888/booking_api/api/bookings/read.php')
      .then((response:any) => {
        this.setState({
          existingBookings: response.data.data 
        });
      this.getConfigData();
    })
  }

  getConfigData(){
    axios.get('http://localhost:8888/booking_api/api/configs/readConfig.php')
      .then((response:any) => {
        this.setState({
          configurations: response.data.data 
        });
      this.disableBookedUpDays();
    })
  }

  getDatesWithBookings(){
    //get configuration from DB
    let sitting1Time: string = '';
    this.state.configurations.map(key=>{
      if(key.setting == 'sitting_1')
        sitting1Time = key.value;
    });
    let sitting2Time: string = '';
    this.state.configurations.map(key=>{
      if(key.setting == 'sitting_2')
        sitting2Time = key.value;
    });

    //Create an array to save & update booking values
    let tempList: IBookingDay[] = [];
    
     this.state.existingBookings.map(currentBooking => {
      //Get date and time for booking in question
      let bookingToCheck: IBookingDay;
      let date = moment(currentBooking.date).format('YYYY-MM-DD');
      let time = moment(currentBooking.date).format('HH:mm');
        
      //Check if current booking date exists in our temporary booking array, if not set values to empty
      bookingToCheck = tempList.find(bookingDay => bookingDay.bookedDate === date) || {
        bookedDate: '',
        sittings: {
          sitting1: 0,
          sitting2: 0
        }
      };

      //If bookingToCheck date does not exist in our temp list, 
      //set the booking to check value  to current booking values
      let bookingIsNew = false;
      if(bookingToCheck.bookedDate === '') {
        bookingIsNew = true;
        bookingToCheck.bookedDate = date;
      }

      if(time === sitting1Time){
        (currentBooking.guest_nr < 7 ? bookingToCheck.sittings.sitting1++ :bookingToCheck.sittings.sitting1 += 2)
          
      }else if(time === sitting2Time) {
        (currentBooking.guest_nr < 7 ? bookingToCheck.sittings.sitting2++ :bookingToCheck.sittings.sitting2 += 2)
      }
       
      if(bookingIsNew) {
        tempList.push(bookingToCheck);
      }
    });  

    this.setState({
      daysWithBooking: tempList,
    }, ()=> console.log(this.state.daysWithBooking));
  }


  disableBookedUpDays(){
    if (this.state.existingBookings == undefined){
      console.log('got ya');
      return
    }else{
      console.log(this.state.existingBookings);
      this.getDatesWithBookings();

      console.log("Im looking for this",this.state.daysWithBooking);
      let disabledDays: Date[] = [];
      this.state.daysWithBooking.map(day => {
  
        if(day.sittings.sitting1 === 15 && day.sittings.sitting2 === 15)
          disabledDays.push(new Date(day.bookedDate));
      });
  
      this.setState({
        disabledDays: disabledDays
      });
    }
  }

  handleDayClick = (day: Date) => {
    let booking = this.props.theBooking;
    booking.date = day;
    booking.view = this.props.theBooking.view + 1;
    this.props.onDayClick(booking);
  }

  handleView = (event: any) => {
    let booking = this.props.theBooking;
    booking.view = parseInt(event.target.value);

    this.props.onclick(booking);
  }

  render() {
    return (
      <div className="page-container">
        <section className="timeParentTopSection">
          <div className="timeChildTopSection">
            <button className="timeTopSection" onClick={this.handleView} value="1">Guests</button>
            <button className="timeTopSection">{this.props.theBooking.guests}</button>
          </div>
        </section>
        <h1>Select date</h1>
        <DayPicker
          fromMonth={new Date()}
          initialMonth={new Date(2019, 8)}
          
          disabledDays= {this.state.disabledDays.map(currentDate => {
            let asMoment = moment(currentDate);
            return new Date(asMoment.year(), asMoment.month(), asMoment.date());
          })}
          onDayClick={this.handleDayClick}
        />
      </div> 
    )
  }
}
export default Calender;
