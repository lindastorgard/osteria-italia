import React from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import { IBooking } from '../Booking/Booking';
import './Calender.scss';


export interface ICalenderState{
  
}

interface ICalenderProps{
  theBooking: IBooking,
  onDayClick(updatedBooking: IBooking): void;
  // selectedDay: any
}

class Calender extends React.Component <ICalenderProps, ICalenderState> {
  constructor(props: any) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
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
        <h1>Select date</h1>
        <DayPicker
          onDayClick={this.handleDayClick}
        />
        <p>Please select the date</p>
      </div>

      
    )
  }
}
export default Calender;
