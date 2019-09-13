import React from 'react';
import LandingPage from './LandingPage';
import { shallow } from 'enzyme';
import sinon, { spy } from 'sinon';
import { expect } from 'chai';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  let wrapper = shallow(<LandingPage />);
});
