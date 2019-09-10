import React from 'react';
import ReactDOM from 'react-dom';
import Calender from './Calender';
import { shallow } from 'enzyme';

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
    onDayClick: jest.fn(),
    onclick: jest.fn()
};

it('renders without crashing', () => {
  let wrapper = shallow(<Calender {...props}/>);
});

it('can change date', () => {
  //let spy = spyOn(Calender.prototype, 'this.props.onDayClick');
  let wrapper = shallow<Calender>(<Calender {...props}/>);

  let newDate = new Date(2019, 10, 6);

  wrapper.instance().handleDayClick(newDate);
  wrapper.update();

  expect(props.onDayClick).toHaveBeenCalled();
})