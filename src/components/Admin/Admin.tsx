import React from 'react';
import {Table, Button, Row, Col, Container} from 'reactstrap';
import axios from "axios";
import {ModifyBooking} from "../ModifyBooking/ModifyBooking";

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

    componentDidMount(): void {
        this.getBookings();
    }

    deleteItemFromState = (id: number) => {
        const updatedBookings = this.state.bookings.filter((booking: any) => booking.id !== id);
        this.setState({bookings: updatedBookings})
    };
    deleteItem = (id: number) => {
        let confirmDelete = window.confirm('Delete booking?');
        if (confirmDelete) {
            console.log('Removing booking with id ' + id);
            axios.delete('http://localhost:8888/booking_api/api/bookings/deleteBooking.php', {
                "data": {
                    "id": id
                }
            })
                .then(response => {
                    console.log(response.data);
                    this.deleteItemFromState(id);
                })
                .catch(error => console.error(error));
        }
    };
    updateState = (booking: any) => {
        const itemIndex = this.state.bookings.findIndex((data: any) => data.id === booking.id);
        const newArray = [
            // destructure all items from beginning to the indexed booking
            ...this.state.bookings.slice(0, itemIndex),
            // add the updated booking to the array
            booking,
            // add the rest of the items to the array from the index after the replaced booking
            ...this.state.bookings.slice(itemIndex + 1)
        ];
        this.setState({bookings: newArray})
    };
    getBookings = () => {
        axios.get('http://localhost:8888/booking_api/api/bookings/read.php')
            .then(response => {
                console.log('Got response from server');
                console.log(response.data);
                if (response.data.data) {
                    this.setState({bookings: response.data.data})
                } else {
                    this.setState({bookings: []})
                }
            })
            .catch(error => console.log(error));
    };

    render() {
        const bookings = this.state.bookings.map((booking: any) => {
            return (
                <tr key={booking.id}>
                    <th scope="row">{booking.id}</th>
                    <td>{booking.name}</td>
                    <td>{booking.lastname}</td>
                    <td>{booking.email}</td>
                    <td>{booking.phone}</td>
                    <td>{booking.guest_nr}</td>
                    <td>{booking.date}</td>
                    <td>
                        <div style={{width: "130px"}}>
                            <ModifyBooking
                                booking={booking}
                                updateState={this.updateState}/>
                            {' '}
                            <Button color="danger" onClick={() => this.deleteItem(booking.id)}>Del</Button>
                        </div>
                    </td>
                </tr>
            )
        });

        function BookingsTable() {
            return (
                <Table responsive hover>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>First</th>
                        <th>Last</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Guests</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {bookings}
                    </tbody>
                </Table>
            );
        }

        return (
            <Container className="App" style={{marginTop: "50px"}}>
                <Row>
                    <Col>
                        <h1 style={{margin: "50px 0"}}>Bookings Admin</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <BookingsTable/>
                    </Col>
                </Row>
            </Container>);
    }
}

export default Admin;
