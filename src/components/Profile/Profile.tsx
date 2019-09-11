import React, {Component} from 'react';
import './Profile.scss';
import { IBooking } from '../Booking/Booking';
import axios from 'axios';
import { string } from 'prop-types';
import { throwStatement } from '@babel/types';
// import SimpleGDPR from 'simple-gdpr';
// import 'simple-gdpr/dist/simplegdpr.min.css';

// const notice = new SimpleGDPR()

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

interface ICustomer {
    id: number,
    firstName: string,
    lastname: string,
    email: string,
    phone: string
}

export interface IAddProfileState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  firstNameError: string;
  lastNameError: string;
  emailError: string;
  phoneError: string;
  checkboxError: string;

  showFirstNameError: boolean;
  showLastNameError: boolean;
  showEmailError: boolean;
  showPhoneError: boolean;
  showCheckboxError: boolean;

  checked: boolean,

  myBookings: ICustomerData[];
  myCustomers: ICustomer[];

}

export interface IAddProfileProps {
  theBooking: IBooking;

  onsubmit(updatedBooking: IBooking): void,

  onclick(updatedBooking: IBooking): void,
}

class Profile extends React.Component <IAddProfileProps, IAddProfileState> {

  constructor(props: any) {
    super(props);

      this.state = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        firstNameError: 'Must be 2 letters or more',
        lastNameError: 'Must be 2 letters or more',
        emailError: 'Invalid Email',
        phoneError: 'Phone number is too short',
        checkboxError: 'Check box to confirm',
        showFirstNameError: false,
        showLastNameError: false,
        showEmailError: false,
        showPhoneError: false,
        showCheckboxError: false,
        checked: false,
        myBookings: [{
          id: 0,
          customer_id: 0,
          guest_nr: 0,
          date: '',
          firstname: '',
          lastname: '',
          email: '',
          phone: ''
        }],
        myCustomers: [{
          id: 0,
          firstName: '',
          lastname: '',
          email: '',
          phone: ''
        }]
      };

      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleView = this.handleView.bind(this);
      this.handelNewCustomer = this.handelNewCustomer.bind(this);
      this.handleBackStep = this.handleBackStep.bind(this);
      this.handleCheckbox = this.handleCheckbox.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    axios.get('http://localhost:8888/booking_api/api/customers/read.php')
      .then(response => {
        console.log('Got response from server');
        this.setState({myCustomers: response.data.data})
      })
      .catch(error => console.log(error));
  }

  isCustomerInDatabase() {
    for (let index = 0; index < this.state.myCustomers.length; index++) {
      let newCustomerEmail = this.props.theBooking.profile.email;

      if (newCustomerEmail === this.state.myCustomers[index].email) {
        let oldCustomerId = this.state.myCustomers[index].id;

        let booking = this.props.theBooking;
        booking.customerId = oldCustomerId;
        return true;
      }
    }
    // If the customer was not in the database
    return false;
  }

  handelNewCustomer(booking: IBooking) {
    this.postCustomer(booking);
  }

  postCustomer(booking: IBooking) {
    axios.post('http://localhost:8888/booking_api/api/customers/createCustomer.php', {
      name: this.props.theBooking.profile.firstName,
      lastname: this.props.theBooking.profile.lastName,
      email: this.props.theBooking.profile.email,
      phone: this.props.theBooking.profile.phone
    },
    // https://stackoverflow.com/questions/48255545/axios-getting-two-requests-options-post
    // Important to not remove this header due to ajax making cross domain reqs which will break our integration
    {
      headers: {
        'Content-Type': 'text/plain'
      }
    })
      .then(response => {
        let newCustomerId = response.data.id;
        console.log('Created new customer with id ' + newCustomerId);
        this.props.theBooking.customerId = newCustomerId;
      })
      .catch(error => console.log(error.data.message));
  }

  handleSubmit = (event: any) => {
    event.preventDefault();
    let booking = this.props.theBooking;
    booking.profile = this.state;

    const isValid = this.validate();

    if (isValid) {
      if (!this.isCustomerInDatabase()) {
        this.handelNewCustomer(booking);
      }

      booking.view = this.props.theBooking.view + 1;
      this.props.onsubmit(booking);
    }
  };

  handleInputChange(event: any) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    } as any);

  }

  handleCheckbox =() => {
      this.setState((prevState: any) => ({
          checked: !prevState.checked
      }))
  };

  handleView = (event: any) => {
    let booking = this.props.theBooking;
    booking.view = parseInt(event.target.value);

    this.props.onclick(booking);
  };

  handleBackStep(){
    let booking = this.props.theBooking;
    booking.view = this.props.theBooking.view - 1;

    this.props.onclick(booking);
  }

  validate() {
    let showfirstNameError = false;
    let showlastNameError = false;
    let showemailError = false;
    let showphoneError = false;
    let showcheckboxError = false;
    

    if (this.state.firstName.length < 2) {
      showfirstNameError = true;
    }

    if (this.props.theBooking.profile.lastName.length < 2) {
      showlastNameError = true;
    }

    if (!this.props.theBooking.profile.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      showemailError = true;
    }

    if (this.props.theBooking.profile.phone.length < 5) {
      showphoneError = true;
    }

    if (!this.state.checked) {
      showcheckboxError = true;
    }


    if (showfirstNameError || showlastNameError || showemailError || showphoneError || showcheckboxError) {
      this.setState({
      showFirstNameError: showfirstNameError,
      showLastNameError: showlastNameError,
      showEmailError: showemailError,
      showPhoneError: showphoneError,
      showCheckboxError: showcheckboxError,
      });
      return false;
    }

    return true;
  }


  render() {

    let firstNameError: JSX.Element = (<div className="errorMessage">{this.state.firstNameError}</div>);
      if (!this.state.showFirstNameError) {
        firstNameError = (<div></div>);
      }

      let lastNameError: JSX.Element = (<div className="errorMessage">{this.state.lastNameError}</div>);
      if (!this.state.showLastNameError) {
        lastNameError = (<div></div>);
      }

      let emailError: JSX.Element = (<div className="errorMessage">{this.state.emailError}</div>);
      if (!this.state.showEmailError) {
          emailError = (<div></div>);
      }

      let phoneError: JSX.Element = (<div className="errorMessage">{this.state.phoneError}</div>);
      if (!this.state.showPhoneError) {
          phoneError = (<div></div>);
      }

      let checkboxError: JSX.Element = (<div className="errorMessage">{this.state.checkboxError}</div>);
      if (!this.state.showCheckboxError) {
          checkboxError = (<div></div>);
      }


      return (
        <main className="prof-page-container">
        
          <div className="panel panel-default">
            </div>
              <section className="prof-parent-top-section">
              <button className="back-button" onClick={this.handleBackStep}><img className="back-icon" src="/Images/back-button.png" alt="previous button"/></button>
                <div className="prof-child-top-section">
                  <button className="prof-top-section-black" onClick={this.handleView} value="1">Guests</button>
                  <button className="prof-top-section">{this.props.theBooking.guests}</button>
                </div>
                <div className="prof-child-top-section">
                  <button className="prof-top-section-black" onClick={this.handleView} value="2">Date</button>
                  <button className="prof-top-section">{this.props.theBooking.date.toLocaleDateString()}</button>
                </div>
                <div className="prof-child-top-section">
                  <button className="prof-top-section-black" onClick={this.handleView} value="3">Time</button>
                  <button className="prof-top-section">{this.props.theBooking.time} PM</button>
                </div>
              </section>
                <div className="prof-parent">
                  <h1 className="profile-heading">Your details</h1>
                  
                  <form onSubmit={this.handleSubmit} className="prof-child">
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
                      <p className="gdpr-consent">I consent to the processing of my data according to the Privacy Policy disclosure *.</p>  
                    <input 
                      name= "checkbox"
                      type="checkbox"
                      className="profilebox-small"
                      onChange={this.handleCheckbox}/>
                      {checkboxError}
                      
                  <button type="submit" value="Submit" className="primary-btn" >Submit</button>
                </form>
              </div>
            </main>
        )
    }
   
}

export default Profile;
