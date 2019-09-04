import React, { Component } from 'react';
import './Profile.scss';
import { IBooking } from '../Booking/Booking';


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
}

export interface IAddProfileProps{
    theBooking: IBooking;
    onsubmit(updatedBooking: IBooking): void,
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
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleSubmit = (event: any) => { 
        event.preventDefault();
        let booking = this.props.theBooking;
        booking.profile = this.state;
        
        const isValid = this.validate();
        
        if (isValid) {
            console.log(this.props.theBooking.profile)
            // clear form
            // this.setState({firstNameError: ''})
            // this.setState({lastNameError: ''})
            // this.setState({emailError: ''})
            // this.setState({phoneError: ''})

            this.props.onsubmit(booking);
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
            this.setState({ showFirstNameError: showfirstNameError, showLastNameError: showlastNameError, showEmailError: showemailError, showPhoneError: showphoneError });
            // return false;
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