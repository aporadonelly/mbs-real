import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavLinkItems from '../NavLinkItems';

Enzyme.configure({ adapter: new Adapter() });

const mockPath = jest.fn();
const setup = (props = { path: mockPath }) => shallow(<NavLinkItems {...props} />);
const findByTest = (wrapper, val) => wrapper.find(`[data-testid="${val}"]`);

test('renders navbar', () => {
    const wrapper = setup();
    const fullApp = findByTest(wrapper, 'NavLink');
    expect(fullApp.length).toBe(1);
    expect(wrapper.length).toBe(1);
});

test('renders navbar list items', () => {
    const wrapper = setup();
    const fullApp = findByTest(wrapper, 'NavLink_Item');
    expect(fullApp.length).toBe(1);
});

test('renders navbar list icons', () => {
    const wrapper = setup();
    const fullApp = findByTest(wrapper, 'NavLink_Icon');
    expect(fullApp.length).toBe(1);
});

test('renders navbar item title', () => {
    const wrapper = setup({ path: '/dashboard', content: 'Dashboard' });
    const NavContentComponent = findByTest(wrapper, 'NavLink_Content');
    expect(NavContentComponent.length).toBe(1);
    expect(NavContentComponent.props('primary')).toBeTruthy();
});
