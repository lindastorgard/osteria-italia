import React from 'react';
import axios from 'axios';

type AdminState = {
    bookings: any;
}

class Admin extends React.Component<{}, AdminState> {

    state = {
        bookings: []
    };

    constructor(props: any) {
        super(props);
        this.getBookings();
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

    listBookings = () => {
        return this.state.bookings.map( (booking: any) => {
        return (
            <li key={"booking_" + booking.id }>Reservation made by {booking.name} on {booking.date} for {booking.guest_nr} guests
                <button onClick={(event) => this.deleteBooking(booking.id)}>X</button>
            </li>
        )
        });
    };

    render() {
        return (
            <div>
                <ul>
                    {this.listBookings()}
                </ul>
            </div>
        )
    }
}
export default Admin;
