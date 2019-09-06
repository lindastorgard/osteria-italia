import React, { Component } from 'react';
import './Profile.scss';
import Booking, { IBooking } from '../Booking/Booking';
import axios from 'axios';
import { string } from 'prop-types';
import { throwStatement } from '@babel/types';

interface ICustomerData{
  id: number, 
  customer_id: number, 
  guest_nr: number, 
  date: string, 
  firstname: string, 
  lastname: string, 
  email: string, 
  phone: string
  
}

interface ICustomer{
  id: number,
  firstName: string,
  lastname: string,
  email: string,
  phone: string
}

export interface IAddProfileState{
  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  firstNameError: string;
  lastNameError: string;
  emailError: string;
  phoneError: string;

  showFirstNameError: boolean;
  showLastNameError: boolean;
  showEmailError: boolean;
  showPhoneError: boolean;

  myBookings: ICustomerData[];
  myCustomers: ICustomer[];

}

export interface IAddProfileProps{
  theBooking: IBooking;
  onsubmit(updatedBooking: IBooking): void,
  onclick(updatedBooking: IBooking): void,
}

class Profile extends React.Component <IAddProfileProps,IAddProfileState> {
    
  constructor(props:any){
  super(props);

  this.state = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    firstNameError: 'Must be 2 letters or more',
    lastNameError: 'Must be 2 letters or more',
    emailError: 'Invalid Email',
    phoneError: 'Phonenumber is Too short',
    showFirstNameError: false,
    showLastNameError: false,
    showEmailError: false,
    showPhoneError: false,
    myBookings: [{
      id: 0, 
      customer_id: 0,
      guest_nr: 0, 
      date: '', 
      firstname: '', 
      lastname: '', 
      email: '', 
      phone: ''}],
    myCustomers: [{
      id: 0,
      firstName: '',
      lastname: '',
      email: '',
      phone: ''}]
    };
        
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleView = this.handleView.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handelNewCustomer = this.handelNewCustomer.bind(this);
    this.getCustomers = this.getCustomers.bind(this);
    this.postCustomer = this.postCustomer.bind(this);
    this.handleCustomerEmail = this.handleCustomerEmail.bind(this);
  }

  componentDidMount(){
    axios.get('http://localhost:8888/booking_api/api/bookings/read.php')
      .then(response => {
        console.log('Got response from server');
        this.setState({ myBookings: response.data.data })
      })
        .catch(error => console.log(error));
  }

  handleCustomerEmail(){
    for (let index = 0; index < this.state.myCustomers.length; index++) {
      let newCustomerEmail = this.props.theBooking.profile.email;
      
      if(newCustomerEmail === this.state.myCustomers[index].email){
        let old_customer_id = this.state.myCustomers[index].id;

        let booking = this.props.theBooking;
        booking.customerId = old_customer_id;  
      }
    }
  }

  
  handleEmail(){
    for (let index = 0; index < this.state.myBookings.length; index++) {
      let newEmail = this.props.theBooking.profile.email;

      if(newEmail === this.state.myBookings[index].email){
        let old_customer_id = this.state.myBookings[index].customer_id;

        let booking = this.props.theBooking;
        booking.customerId = old_customer_id;  
        return true;
      }
    }
  }

  handelNewCustomer(booking: IBooking){
    this.postCustomer(booking);  
  }

  postCustomer(booking: IBooking){
    axios.post('http://localhost:8888/booking_api/api/customers/createCustomer.php', {
      name: this.props.theBooking.profile.firstName,
      lastname: this.props.theBooking.profile.lastName,
      email: this.props.theBooking.profile.email,
      phone: this.props.theBooking.profile.phone
    })
      .then(response => {
        this.getCustomers(booking);
      })
      .catch(error => console.log(error.data.message));
  }

  getCustomers(booking: IBooking){
    axios.get('http://localhost:8888/booking_api/api/customers/readCustomers.php')
      .then(response => {
        console.log('Got response from server');
        this.setState({ myCustomers: response.data.data }, () => { 
        this.handleCustomerEmail();
        this.props.onsubmit(booking);
        });
      })
      .catch(error => console.log(error));
  }
    

  handleSubmit = (event: any) => { 
    event.preventDefault();
    let booking = this.props.theBooking;
    booking.profile = this.state;
  
    const isValid = this.validate();
        
    if (isValid) {
      booking.view = this.props.theBooking.view + 1;

      if(!this.handleEmail()){
        this.handelNewCustomer(booking);
      } else {
        this.props.onsubmit(booking);
      }
    } 
        
  };

  handleInputChange(event:any) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
        
    this.setState({
      [name]: value
    } as any);
      
  }

  handleView = (event: any) => {
    let booking = this.props.theBooking;
    booking.view = parseInt(event.target.value);

    this.props.onclick(booking);
  }


  validate() {
    let showfirstNameError = false;
    let showlastNameError = false;
    let showemailError = false;
    let showphoneError = false;

    if (this.state.firstName.length < 2 ) {
      showfirstNameError = true;
    }

    if (this.props.theBooking.profile.lastName.length < 2 ) {
      showlastNameError = true;
    } 

    if (!this.props.theBooking.profile.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      showemailError = true;
    } 
           
    if (this.props.theBooking.profile.phone.length < 5) {
      showphoneError = true;
    }  

    if (showfirstNameError || showlastNameError || showemailError || showphoneError) {
      this.setState({ showFirstNameError: showfirstNameError, showLastNameError: showlastNameError,showEmailError: showemailError, showPhoneError: showphoneError });
      return false;
    } 

    return true;
  }


  render() {

    let firstNameError: JSX.Element = (<div className="errorMessage">{this.state.firstNameError}</div>);
    if(!this.state.showFirstNameError) {
      firstNameError = (<div></div>);
    }
        
    let lastNameError: JSX.Element = (<div className="errorMessage">{this.state.lastNameError}</div>);
    if(!this.state.showLastNameError) {
      lastNameError = (<div></div>);
    }

    let emailError: JSX.Element = (<div className="errorMessage">{this.state.emailError}</div>);
    if(!this.state.showEmailError) {
      emailError = (<div></div>);
    }

    let phoneError: JSX.Element = (<div className="errorMessage">{this.state.phoneError}</div>);
      if(!this.state.showPhoneError) {
        phoneError = (<div></div>);
    }

    return (
      <main className="profilePageContainer">
        <div className="panel panel-default">
          </div>
            <section className="profileParentTopSection">
              <div className="profileChildTopSection">
                <button className="profileTopSection" onClick={this.handleView} value="1">Guests</button>
                <button className="profileTopSection">{this.props.theBooking.guests}</button>
              </div>

                        {/* Open for date when ready - change all values!!!! */}
                        {/* <div className="timeChildTopSection">
                        <button className="timeTopSection" onClick={this.handleView} value="2">Date</button>
                            <button className="timeTopSection">{this.props.theBooking.date}</button>
                        </div> */}

              <div className="profileChildTopSection">
                <button className="profileTopSection" onClick={this.handleView} value="2">Time</button>
                <button className="profileTopSection">{this.props.theBooking.time}</button>
              </div>
            </section>

            <div className="profileParent">
              <h1>Your details</h1>
              <form onSubmit={this.handleSubmit} className="profileChild">
                <input 
                  name="firstName" 
                  className="profilebox" 
                  type="name" 
                  placeholder="Firstname" 
                  onChange={this.handleInputChange}></input>
                    
                  {firstNameError}
                <input 
                  name="lastName" 
                  className="profilebox" 
                  type="lastname" 
                  placeholder="Lastname" 
                  onChange={this.handleInputChange}/>
                  {lastNameError}
                <input 
                  name="email" 
                  className="profilebox" 
                  type="text" 
                  placeholder="Email" 
                  onChange={this.handleInputChange}/>
                  {emailError}
                <input 
                  name="phone" 
                  className="profilebox" 
                  type="phone" 
                  placeholder="Phone" 
                  onChange={this.handleInputChange}/>
                  {phoneError}
                <button type="submit" value="Submit" className="btn btn-primary">
                    Submit
                </button>
              </form>
            </div>
          </main>
        )
    }
}

export default Profile;