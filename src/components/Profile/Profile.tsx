import React, { Component } from 'react';
// import { FormErrors } from '../FormErrors/FormErrors';
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
        
        const isValid = this.validate();
        if (isValid) {
        console.log(this.props.theBooking.profile)
        }  

        this.props.onsubmit(booking);
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
        // let firstNameError = '';
        // let lastNameError = '';
        let emailError = '';
        // let phoneError = '';

        if (!this.props.theBooking.profile.email.includes('@')) {
            emailError = 'Invalid Email';
        }

        if (emailError) {
            this.setState({ emailError });
            return false;
        }

        return true;
      }

    //   validateField(fieldName, value) {
    //     let fieldValidationErrors = this.state.formErrors;
    //     let firstNameValid = this.state.firstNameValid;
    //     let lastNameValid = this.state.lastNameValid;
    //     let emailValid = this.state.emailValid;
    //     let phoneValid = this.state.phoneValid;
      
    //     switch(fieldName) {
    //         case 'firstName':
    //         firstNameValid = value.length >= 2;
    //         fieldValidationErrors.firstName = firstNameValid ? '': ' is too short';
    //         break;
    //         case 'lastName':
    //         lastNameValid = value.length >= 2;
    //         fieldValidationErrors.lastName = lastNameValid ? '': ' is too short';
    //         break;
    //       case 'email':
    //         emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    //         fieldValidationErrors.email = emailValid ? '' : ' is invalid';
    //         break;
    //       case 'phone':
    //         phoneValid = value.length >= 6;
    //         fieldValidationErrors.phone = phoneValid ? '': ' is too short';
    //         break;
    //       default:
    //         break;
    //     }
    //     this.setState({formErrors: fieldValidationErrors,
    //         firstNameValid: firstNameValid,
    //         lastNameValid: lastNameValid,
    //         emailValid: emailValid,
    //         phoneValid: phoneValid
    //                   }, this.validateForm);
    //   }
      
    //   validateForm() {
    //     this.setState({formValid: 
    //         this.state.firstNameValid && 
    //         this.state.lastNameValid && 
    //         this.state.emailValid && 
    //         this.state.phoneValid});
    //   }

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
                    onChange={this.handleInputChange}/>
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