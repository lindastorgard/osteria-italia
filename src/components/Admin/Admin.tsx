import React from 'react';
import axios from 'axios';
import {EditBooking} from "../EditBooking/EditBooking";

interface IAdminState {
    bookings: any;
    selectedBooking: any;
}

class Admin extends React.Component<{}, IAdminState> {

    state = {
        bookings: [],
        selectedBooking: null
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
                <br />
                <EditBooking booking={this.state.selectedBooking}/>
            </section>
        )
    }
}
export default Admin;
