import React from 'react';
import {Button, Form, FormGroup, Label, Input, FormFeedback} from 'reactstrap';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import axios from "axios";
import moment from "moment";
import {IBookingDay, IConfig} from "../Calender/Calender";

interface EditFormProp {
    updateState: any;
    toggle: any;
    booking: any;
}

interface IEditFormState {
    customer_id: number,
    guest_nr: number,
    date: string,
    id: number,
    name: string,
    lastname: string,
    phone: string,
    email: string,
    time: string,
    configurations: IConfig[],
    existingBookings: any,
    disabledDays: Date[]
}

class EditForm extends React.Component<EditFormProp, Partial<IEditFormState>> {
    state = {
        customer_id: 0,
        guest_nr: 0,
        date: '',
        id: 0,
        name: '',
        lastname: '',
        phone: '',
        email: '',
        time: '',
        configurations: [],
        existingBookings: [],
        disabledDays: []
    };

    constructor(props: any) {
        super(props);
        this.pickDate = this.pickDate.bind(this);
    }

    onChange = (e: any) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    getData() {
        axios.get('http://localhost:8888/booking_api/api/bookings/read.php')
            .then((response: any) => {
                this.setState({
                    existingBookings: response.data.data
                });
                this.getConfigData();
            })
    }

    getConfigData() {
        axios.get('http://localhost:8888/booking_api/api/configs/readConfig.php')
            .then((response: any) => {
                this.setState({
                    configurations: response.data.data
                });
                this.disableBookedUpDays();
            })
    };

    getDatesWithBookings() {
        //get configuration from DB
        let sitting1Time: string = '';
        this.state.configurations.map((key: any) => {
            if (key.setting === 'sitting_1')
                sitting1Time = key.value;
        });
        let sitting2Time: string = '';
        this.state.configurations.map((key: any) => {
            if (key.setting === 'sitting_2')
                sitting2Time = key.value;
        });
        //Create an array to save & update booking values
        let tempList: IBookingDay[] = [];
        this.state.existingBookings.map((currentBooking: any) => {
            //Get date and time for booking in question
            let date = moment(currentBooking.date).format('YYYY-MM-DD');
            let time = moment(currentBooking.date).format('HH:mm');
            //Check if current booking date exists in our temporary booking array, if not set values to empty
            let bookingToCheck = tempList.find(bookingDay => bookingDay.bookedDate === date) || {
                bookedDate: '',
                sittings: {
                    sitting1: 0,
                    sitting2: 0
                }
            };
            //If bookingToCheck date does not exist in our temp list,
            //set the booking to check value  to current booking values
            let bookingIsNew = false;
            if (bookingToCheck.bookedDate === '') {
                bookingIsNew = true;
                bookingToCheck.bookedDate = date;
            }
            if (time === sitting1Time) {
                (currentBooking.guest_nr < 7 ? bookingToCheck.sittings.sitting1++ : bookingToCheck.sittings.sitting1 += 2)
            } else if (time === sitting2Time) {
                (currentBooking.guest_nr < 7 ? bookingToCheck.sittings.sitting2++ : bookingToCheck.sittings.sitting2 += 2)
            }
            if (bookingIsNew) {
                tempList.push(bookingToCheck);
            }
        });
        return tempList;
    }

    disableBookedUpDays() {
        if (this.state.existingBookings === undefined) {
            console.log('got ya');
            return
        } else {
            console.log(this.state.existingBookings);
            let disabledDays: Date[] = [];
            this.getDatesWithBookings().map((day: any) => {
                if (day.sittings.sitting1 === 15 && day.sittings.sitting2 === 15) {
                    let disabledDate = moment(day.bookedDate);
                    disabledDays.push(new Date(disabledDate.year(), disabledDate.month(), disabledDate.date()));
                }
            });
            this.setState({
                disabledDays: disabledDays
            });
        }
    }

    submitFormEdit = (e: any) => {
        e.preventDefault();
        if (this.invalidNumberOfGuests()) {
            return
        }
        console.log('Editing booking');
        axios.put('http://localhost:8888/booking_api/api/bookings/updateBooking.php', {
                "customer_id": this.state.customer_id,
                "guest_nr": this.state.guest_nr,
                "date": (this.state.date + ' ' + this.state.time + ':00'),
                "id": this.state.id
            },
            // https://stackoverflow.com/questions/48255545/axios-getting-two-requests-options-post
            // Important to not remove this header due to ajax making cross domain reqs which will break our integration
            {
                headers: {
                    'Content-Type': 'text/plain'
                }
            })
            .then(response => {
                console.log('Reservation successfully updated');
                this.props.toggle();
                this.props.updateState({
                    id: this.state.id,
                    guest_nr: this.state.guest_nr,
                    customer_id: this.state.customer_id,
                    date: (this.state.date + ' ' + this.state.time + ':00'),
                    name: this.state.name,
                    lastname: this.state.lastname,
                    email: this.state.email,
                    phone: this.state.phone
                });
            })
            .catch(error => console.log(error));
    };

    componentDidMount() {
        // if item exists, populate the state with proper data
        if (this.props.booking) {
            const {customer_id, id, date, guest_nr, name, lastname, email, phone} = this.props.booking;
            let bookingDate = moment(date).format("YYYY-MM-DD");
            let bookingTime = moment(date).format("HH:mm");
            this.setState({
                id: id,
                guest_nr: guest_nr,
                customer_id: customer_id,
                date: bookingDate,
                time: bookingTime,
                name: name,
                lastname: lastname,
                email: email,
                phone: phone
            });
            this.getData();
        }
    };

    invalidNumberOfGuests() {
        return this.state.guest_nr < 1 ||
            this.state.guest_nr > 10
    }

    pickDate(selectedDay: any, modifiers: any, dayPickerInput: any) {
        if (modifiers.disabled) {
            return;
        }
        this.setState({date: moment(selectedDay).format("YYYY-MM-DD")});
    }

    render() {
        let booking = this.state;
        let bookingDate = moment(booking.date).format("YYYY-MM-DD");
        return (
            <Form onSubmit={this.submitFormEdit}>
                <FormGroup>
                    <Label for="guest_nr">Number of guests</Label>
                    <Input invalid={this.invalidNumberOfGuests()} type="text" name="guest_nr" id="guest_nr"
                           onChange={this.onChange}
                           value={booking.guest_nr === null ? '' : booking.guest_nr}/>
                    <FormFeedback>Please choose a valid number. (Maximum number of guest is 10)</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label for="date">Date</Label>
                    <DayPickerInput format={"YYYY-MM-DD"}
                                    value={bookingDate}
                                    dayPickerProps={{
                                        fromMonth: new Date(bookingDate),
                                        initialMonth: new Date(bookingDate),
                                        disabledDays: [
                                            ...this.state.disabledDays,
                                            {before: new Date()}
                                        ]
                                    }}
                                    onDayChange={this.pickDate}
                                    classNames={{
                                        container: "",
                                        overlay: "",
                                        overlayWrapper: ""
                                    }}
                                    inputProps={{className: 'form-control'}}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="time">Time</Label>
                    <Input type="select" name="time" id="time" onChange={this.onChange}
                           value={booking.time === null ? '' : booking.time}>
                        {
                            this.state.configurations.map((config: IConfig) => {
                                if (config.setting.startsWith('sitting_')) return <option>{config.value}</option>
                            })
                        }
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input disabled={true} type="text" name="email" id="email" onChange={this.onChange}
                           value={booking.email === null ? '' : booking.email}/>
                </FormGroup>
                <FormGroup>
                    <Label for="phone">Phone</Label>
                    <Input disabled={true} type="text" name="phone" id="phone" onChange={this.onChange}
                           value={booking.phone === null ? '' : booking.phone}/>
                </FormGroup>
                <Button>Submit</Button>
            </Form>
        );
    }
}

export default EditForm;
