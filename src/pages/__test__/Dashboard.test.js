import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Dashboard from '../Dashboard';

Enzyme.configure({ adapter: new Adapter() });

const mockPath = jest.fn();
const setup = (props = { path: mockPath }) => shallow(<Dashboard {...props} />);

const findByTest = (wrapper, val) => wrapper.find(`[data-testid="${val}"]`);

test('renders Dashboard page', () => {
    const wrapper = setup();
    const fullApp = findByTest(wrapper, 'dashboard-component');
    expect(fullApp.length).toBe(1);
});
