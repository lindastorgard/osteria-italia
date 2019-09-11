import React from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import axios from "axios";
import FormFeedback from "reactstrap/lib/FormFeedback";

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
    email: string
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
        email: ''
    };
    onChange = (e: any) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };
    submitFormEdit = (e: any) => {
        e.preventDefault();
        if (this.isInvalidNumberOfGuests()) {
            return;
        }
        console.log('Editing booking');
        axios.put('http://localhost:8888/booking_api/api/bookings/updateBooking.php', {
                "customer_id": this.state.customer_id,
                "guest_nr": this.state.guest_nr,
                "date": this.state.date,
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
                this.props.updateState(this.state);
            })
            .catch(error => console.log(error));
    };

    componentDidMount() {
        // if item exists, populate the state with proper data
        if (this.props.booking) {
            const {customer_id, id, date, guest_nr, name, lastname, email, phone} = this.props.booking;
            this.setState({id, guest_nr, customer_id, date, name, lastname, email, phone})
        }
    };

    isInvalidNumberOfGuests() {
        return this.state.guest_nr < 1 || this.state.guest_nr > 10;
    }

    render() {
        let booking = this.state;

        return (
            <Form onSubmit={this.submitFormEdit}>
                <FormGroup>
                    <Label for="guest_nr">Number of guests</Label>
                    <Input type="text" name="guest_nr" id="guest_nr" invalid={this.isInvalidNumberOfGuests()} onChange={this.onChange}
                           value={booking.guest_nr === null ? '' : booking.guest_nr}/>
                           <FormFeedback invalid>Invalid number of guests. Please choose a number between 1 and 10</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label for="date">Date</Label>
                    <Input disabled={true} type="text" name="date" id="date" onChange={this.onChange}
                           value={booking.date === null ? '' : booking.date}/>
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
