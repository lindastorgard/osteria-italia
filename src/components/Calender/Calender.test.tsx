import React from 'react';
import ReactDOM from 'react-dom';
import Calender from './Calender';
import { shallow } from 'enzyme';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const props = {
  theBooking:{

  }

onDayClick: jest.fn(),
  
  onclick: 
}

const mockFunction = jest.fn();
it('should call mockFunction on button click', () => {
  const component = mount(
    <MyComponent onClickFunction={mockFunction} />
  );
  component.find('button#ok-btn').simulate('click');
  expect(mockFunction).toHaveBeenCalled();
  
  component.unmount();
});

let wrapper = shallow(<Calender  {...props}/>)

it('renders without crashing', () => {
  // let wrapper = shallow(<Calender />);
});