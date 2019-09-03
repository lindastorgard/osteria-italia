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
}

export interface IAddProfileProps{
    theBooking: IBooking;
    onsubmit(updatedBooking: IBooking): void,
}

class Profile extends React.Component <IAddProfileProps,IAddProfileState> {
    
    constructor(props:any){
        super(props);
        
        this.handleInput = this.handleInput.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInput = (event: any) => { 
        event.preventDefault();
        let booking = this.props.theBooking;
        booking.profile = this.state;
        
        this.props.onsubmit(booking);

        
        const isValid = this.validate();
        if (isValid) {
            console.log(this.props.theBooking.profile)
            // clear form
            this.setState({firstNameError: ''})
            this.setState({lastNameError: ''})
            this.setState({emailError: ''})
            this.setState({phoneError: ''})
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

      validate = () => {
        let firstNameError = '';
        let lastNameError = '';
        let emailError = '';
        let phoneError = '';

        if (this.props.theBooking.profile.firstName.length < 2 ) {
            firstNameError = 'Must be 2 letters or more';
        }

        if (this.props.theBooking.profile.lastName.length < 2 ) {
            lastNameError = 'Must be 2 letters or more';
        } 

        if (!this.props.theBooking.profile.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
            emailError = 'Invalid Email';
        } 
           
        if (this.props.theBooking.profile.phone.length < 5) {
            phoneError = 'Phonenumber is to short';
        }  

        if (firstNameError || lastNameError || emailError || phoneError) {
            this.setState({ firstNameError, lastNameError, emailError, phoneError });
            return false;
        } 

        return true;
      }


    render() {

        return (
            <main className="profilePageContainer">

            <div className="panel panel-default">
            </div>

                <div className="profileParent">
                <h1>Your details</h1>
                <form onSubmit={this.handleInput} className="profileChild">
                    <input 
                    name="firstName" 
                    className="profilebox" 
                    type="name" 
                    placeholder="Firstname" 
                    onChange={this.handleInputChange}></input>
                    <div className="errorMessage">{this.props.theBooking.profile.firstNameError}</div>
                    <input 
                    name="lastName" 
                    className="profilebox" 
                    type="lastname" 
                    placeholder="Lastname" 
                    onChange={this.handleInputChange}/>
                    <div className="errorMessage">{this.props.theBooking.profile.lastNameError}</div>
                    <input 
                    name="email" 
                    className="profilebox" 
                    type="text" 
                    placeholder="Email" 
                    onChange={this.handleInputChange}/>
                    <div className="errorMessage">{this.props.theBooking.profile.emailError}</div>
                    <input 
                    name="phone" 
                    className="profilebox" 
                    type="phone" 
                    placeholder="Phone" 
                    onChange={this.handleInputChange}/>
                    <div className="errorMessage">{this.props.theBooking.profile.phoneError}</div>
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