import React from 'react';
import Footer from './Footer';
import { shallow } from 'enzyme';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  let wrapper = shallow(<Footer />);
});

it('renders two `.social-icon`', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.find('.social-icon')).toHaveLength(2);
  });