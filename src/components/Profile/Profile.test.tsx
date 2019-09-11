import React from 'react';
import { mount, shallow } from 'enzyme';
import Profile, { IAddProfileProps } from './Profile';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const props = {
    theBooking:{
      view: 2,
      guests: 4,
      date: new Date(),
      time: '18:00',
      customerId: 5,
      profile: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
  
        firstNameError: '',
        lastNameError: '',
        emailError: '',
        phoneError: '',
  
        showFirstNameError: true,
        showLastNameError: true,
        showEmailError: true,
        showPhoneError: true,
  
        myBookings: [],
        myCustomers: []
      }
    },
      onsubmit: jest.fn(),
      onclick: jest.fn()
  };

//For test to pass you need to comment out console.log('Got response from server'); 
//in componentDidMount in Profile.tsx

describe('Profile ', () => {
    it('renders without crashing', () => {
      shallow(<Profile {...props} />);
    });
});
