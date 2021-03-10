import 'jsdom-global/register';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MainNavBar from '../MainNavbar';

Enzyme.configure({ adapter: new Adapter() });

const mockPath = jest.fn();
const setup = (props = { path: mockPath }) => shallow(<MainNavBar {...props} />);

const findByTest = (wrapper, val) => wrapper.find(`[data-testid="${val}"]`);

test('renders Main Navbar Component', () => {
    const wrapper = setup();
    const fullApp = findByTest(wrapper, 'NavBar_Component');
    expect(fullApp.length).toBe(1);
});

test('renders Header Component to the Main Navbar', () => {
    const wrapper = setup();
    const fullApp = findByTest(wrapper, 'NavBar_Header_Component');
    expect(fullApp.length).toBe(1);
});
