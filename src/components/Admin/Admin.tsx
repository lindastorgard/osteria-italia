import React from 'react';
import axios from 'axios';

class Admin extends React.Component {

    constructor(props: any) {
        super(props)
        this.getBookings();
    }

    getBookings = () => {
        axios.get('http://localhost:8888/api/bookings/read.php')
            .then(response => {
                    console.log('Got response from server');
                    console.log(response.data);
            })
            .catch(error => console.log(error));
    }
    render() {
        return (
            <div>
                <p>Hello Admin World!</p>
            </div>
        )
    }
}
export default Admin;
