import React from 'react';
import axios from 'axios';

interface IAdminState {
    bookings: any;
    selectedBooking: any;
}

class Admin extends React.Component<{}, IAdminState> {

    state = {
        bookings: [],
        selectedBooking: {
            email: '',
            guest_nr: '',
            date: ''
        }
    };

    constructor(props: any) {
        super(props);
        this.getBookings();

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getBookings = () => {
        axios.get('http://localhost:8888/booking_api/api/bookings/read.php')
            .then(response => {
                    console.log('Got response from server');
                    console.log(response.data);
                    this.setState({ bookings: response.data.data })
            })
            .catch(error => console.log(error));
    };

    deleteBooking = (id: number) => {
        console.log('Removing booking with id ' + id)
        axios.delete('http://localhost:8888/booking_api/api/bookings/deleteBooking.php', {
           "data": {
               "id": id
           }
        })
            .then(response => {
                window.location.reload();
                console.log(response.data);
            })
            .catch(error => console.error('Something went wrong'))
    }

    selectBooking = (booking: any) => {
        this.setState({
            bookings: this.state.bookings,
            selectedBooking: booking
        })
    }

    editBooking = (booking: any) => {
        axios.put('http://localhost:8888/booking_api/api/bookings/updateBooking.php', {
            "data": {
                "customer_id": booking.customer_id,
                "guest_nr": booking.guest_nr,
                "date": booking.date,
                "id": booking.id
            }
        })
            .then(response => {
                console.log('Reservation successfully updated');
            })
            .catch( error => console.log('Something went wrong'))
    }

    handleInputChange = (event: any) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            selectedBooking: {
                [name]: value
            }
        });
    }

    handleSubmit = (event: any) => {
        // code goes here
    }

    listBookings = () => {
        return this.state.bookings.map( (booking: any) => {
        return (
            <li key={"booking_" + booking.id }>Reservation made by {booking.name} on {booking.date} for {booking.guest_nr} guests
                <button onClick={(event) => this.deleteBooking(booking.id)}>Delete</button>
                <button onClick={(event) => this.selectBooking(booking)}>Modify</button>
            </li>
        )
        });
    };

    render() {
        return (
            <section>
             <div>
                <ul>
                    {this.listBookings()}
                </ul>
             </div>
                <form onSubmit={this.handleSubmit}>
                    <label>Email</label>
                    <input
                        name="email"
                        type="text"
                        value={this.state.selectedBooking.email}
                        onChange={this.handleInputChange}/>
                    <label>Number of guests</label>
                    <input
                        name="numberOfGuests"
                        type="number"
                        value={this.state.selectedBooking.guest_nr}
                        onChange={this.handleInputChange}
                    />
                    <label>Date and time</label>
                    <input
                        name="date"
                        type="date"
                        value={this.state.selectedBooking.date}
                        onChange={this.handleInputChange}
                    />
                    <button type="submit">Submit changes</button>
                </form>
            </section>
        )
    }
}
export default Admin;
