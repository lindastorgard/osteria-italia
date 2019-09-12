import React from 'react';
import ReactDOM from 'react-dom';
import Booking from './Booking';
import { shallow } from 'enzyme';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  let wrapper = shallow(<Booking />);
});

it('can set state of booking', () => {
  
  let wrapper = shallow<Booking>(<Booking />);
  wrapper.instance().setState({
    booking: {
      view: 1,
      guests: 0,
      date: new Date(),
      time: '',
      customerId: 0,
      profile: {
        firstName:'',
        lastName: '',
        email: '',
        phone: '',
        firstNameError: '',
        lastNameError: '',
        emailError: '',
        phoneError: '',
        checkboxError: '',
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
        phone: ''}],
      myCustomers: [{
        id: 0,
        firstName: '',
        lastname: '',
        email: '',
        phone: ''}]
      }
    }  
  });

  // wrapper.instance().handleDayClick(newDate);
  // wrapper.update();

  expect(props.onDayClick).toHaveBeenCalled();
})