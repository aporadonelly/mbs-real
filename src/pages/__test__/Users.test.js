import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Users from '../Users';

Enzyme.configure({ adapter: new Adapter() });

const mockPath = jest.fn();
const setup = (props = { path: mockPath }) => shallow(<Users {...props} />);

const findByTest = (wrapper, val) => wrapper.find(`[data-testid="${val}"]`);

test('renders Users page', () => {
    const wrapper = setup();
    const fullApp = findByTest(wrapper, 'users-component');
    expect(fullApp.length).toBe(1);
});
