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
        axios.get('http://localhost:8888/api/bookings/read.php')
            .then(response => {
                    console.log('Got response from server');
                    console.log(response.data);
                    this.setState({ bookings: response.data.data })
            })
            .catch(error => console.log(error));
    };

    listBookings = () => {
        return this.state.bookings.map( (booking: any) => {
        return <li>Reservation made by {booking.name} on {booking.date} for {booking.guest_nr} guests</li>
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
