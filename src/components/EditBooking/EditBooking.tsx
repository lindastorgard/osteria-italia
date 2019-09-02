import React from 'react';

interface IEditBookingProp {
    booking: any;
}

export class EditBooking extends React.Component< IEditBookingProp, {}> {

    render() {
        let booking = this.props.booking;
        let message = '';

        if (booking) {
            message = 'Edit booking with id ' + booking.id;
        } else {
            message = 'No booking selected';
        }
        return (
            <section>
              <div>{message}</div>
            </section>
        );
    }
}
