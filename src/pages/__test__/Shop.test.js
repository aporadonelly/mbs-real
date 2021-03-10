import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Shop from '../Shop';

Enzyme.configure({ adapter: new Adapter() });

const mockPath = jest.fn();
const setup = (props = { path: mockPath }) => shallow(<Shop {...props} />);

const findByTest = (wrapper, val) => wrapper.find(`[data-testid="${val}"]`);

test('renders Shop page', () => {
    const wrapper = setup();
    const fullApp = findByTest(wrapper, 'shop-component');
    expect(fullApp.length).toBe(1);
});
