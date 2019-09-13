import React from 'react';
import { mount, shallow } from 'enzyme';
import Profile from './Profile';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// import { IAddProfileProps } from './Profile';

configure({ adapter: new Adapter() });

const props = {
  newCustomer: {
    firstName: 'Michael',
      lastName: 'Persson',
      email: 'Michaelperssonl@gmail.com',
      phone: '12345678',
  },

  theBooking:{
    view: 2,
    guests: 4,
    date: new Date(),
    time: '18:00',
    customerId: 5,
    profile: {
      firstName: 'Michael',
      lastName: 'Persson',
      email: 'Michaelperssonmail@gmail.com',
      phone: '12345678',

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

    isCustomerInDatabase: jest.fn(),
    handleSubmit: jest.fn(),
    onclick: jest.fn(),
    onsubmit: jest.fn()
    
};

//For test to pass you need to comment out console.log('Got response from server'); 
//in componentDidMount in Profile.tsx

describe('Profile ', () => {
    it('renders without crashing', () => {
      let wrapper = shallow(<Profile {...props} />);
    });

    it ('should return false', () => {
      props.theBooking = {
        view: 2,
        guests: 4,
        date: new Date(),
        time: '18:00',
        customerId: 5,
        profile: {
          firstName: 'Michael',
          lastName: 'Persson',
          email: 'Michaelperssonmail@gmail.com',
          phone: '12345678',
    
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
      }

      const wrapper = shallow<Profile>(<Profile {...props} />);
      wrapper.instance().setState({
        myCustomers: [{
          id: 1,
          firstName: 'Sebastian',
          lastname: 'Tegel',
          email:'sebastian.tegel@tegelconsulting.se',
          phone: '0701231231'
        }]
      });
      
      let result = wrapper.instance().isCustomerInDatabase();

      expect(result).toBe(false);

    })

    it ('should return true', () => {
      props.newCustomer = {
        firstName: 'Sebastian',
        lastName: 'Tegel',
        email:'sebastian.tegel@tegelconsulting.se',
        phone: '0701231231'
      };

      props.theBooking = {
        view: 2,
        guests: 4,
        date: new Date(),
        time: '18:00',
        customerId: 5,
        profile: {
          firstName: 'Sebastian',
          lastName: 'Tegel',
          email: 'sebastian.tegel@tegelconsulting.se',
          phone: '12345678',
    
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
      }

      const wrapper = shallow<Profile>(<Profile {...props} />);

      wrapper.instance().setState({
        myCustomers: [{
          id: 1,
          firstName: 'Sebastian',
          lastname: 'Tegel',
          email:'sebastian.tegel@tegelconsulting.se',
          phone: '0701231231'
        }]
      });
      wrapper.update();
    
      let result = wrapper.instance().isCustomerInDatabase();

      expect(result).toBe(true);

    })

  //   it('should call handleSubmit when submit', async () => {
  //     const wrapper = mount<Profile>(<Profile {...props} />);
  //     let form = wrapper.find('form');

  //     wrapper.instance().handelNewCustomer = jest.fn(() => { Promise.resolve({
  //       data: { id: 1}
  //     })});

  //     const event = {
  //       preventdefault: jest.fn()
  //     }

  //     let button = form.find('button');

  //     await button.simulate('click', event);

  //     wrapper.update();

  //     expect(props.handleSubmit).toHaveBeenCalled();
  // });


});
