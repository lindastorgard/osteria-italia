import React from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import moment from 'moment/moment.js' 

import { IBooking } from '../Booking/Booking';
import './Calender.scss';
import { runInThisContext } from 'vm';

const axios = require ('axios');

export interface IExistingBoooking{
  id: number,
  customer_id: number,
  guest_nr: number,
  date: Date
}

export interface IConfig{
  setting: string,
  value: string
}


export interface ICalenderState{
  // disabledDay: string,
  disabledDays: Date[],
  existingBookings: IExistingBoooking[],
  configurations: IConfig[] 
}

interface ICalenderProps{
  theBooking: IBooking,
  onDayClick(updatedBooking: IBooking): void;
}

class Calender extends React.Component <ICalenderProps, ICalenderState> {
  constructor(props: any) {
    super(props);
    this.state = {
      // disabledDay: '',
      existingBookings : [],
      disabledDays: [],
      configurations: []
    }

    this.handleDayClick = this.handleDayClick.bind(this);
    this.getConfigData = this.getConfigData.bind(this);
    this.getData = this.getData.bind(this);
    this.fetchBookedTables = this.fetchBookedTables.bind(this);
    this.getDatesWithBookings = this.getDatesWithBookings.bind(this);
    this.disableDates = this.disableDates.bind(this);
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
      console.log("Existing from state: ", this.state.existingBookings);
      this.getConfigData();
      this.getDatesWithBookings();
      // this.disableDates();
    })
  }

  getConfigData(){
    axios.get('http://localhost:8888/booking_api/api/configs/readConfig.php')
      .then((response:any) => {
        this.setState({
          configurations: response.data.data 
        });
        console.log("values from my config table ",this.state.configurations);
    })
    this.getDatesWithBookings();
  }

  //Loop through existing bookings, and get dates with bookings
  getDatesWithBookings(){
    this.state.existingBookings.map(currentBooking => {
      const dayWithBooking = currentBooking.date; 
      console.log("we have bookings this dates: ", dayWithBooking) 
    });
  }

  fetchBookedTables(){
    let sittingOne = 0;
    let sittingTwo = 0;

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
  
    this.state.existingBookings.map(currentBooking => {
      let time = moment(currentBooking.date).format('HH:mm');
          if(sitting1Time === time){
           let tables =  currentBooking.guest_nr < 7 ? 1 : 2;
            sittingOne += tables;
          } else if (sitting2Time === time) {
            let tables =  currentBooking.guest_nr < 7 ? 1 : 2;
            sittingTwo += tables;
          }      
        });
        console.log("at 1800 u have ", sittingOne,"nr of tables" );  
        console.log("at 2100 u have ", sittingTwo,"nr of tables" );
}

disableDates(){
  this.state.existingBookings.map(currentBooking => {
    const dayWithBooking = currentBooking.date;
    this.setState(prevState =>({
      disabledDays:[...prevState.disabledDays, dayWithBooking]
    }));

  });

  console.log("Those days have a booking " + this.state.disabledDays);
}
    

  handleDayClick = (day: Date) => {
    let booking = this.props.theBooking;
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
          initialMonth={new Date(2019, 8)}
          disabledDays={this.state.disabledDays.map(currentDate => {
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
