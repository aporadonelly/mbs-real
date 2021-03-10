import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Inquiries from '../Inquiries';

Enzyme.configure({ adapter: new Adapter() });

const mockPath = jest.fn();
const setup = (props = { path: mockPath }) => shallow(<Inquiries {...props} />);

const findByTest = (wrapper, val) => wrapper.find(`[data-testid="${val}"]`);

test('renders Inquiries page', () => {
    const wrapper = setup();
    const fullApp = findByTest(wrapper, 'inquiries-component');
    expect(fullApp.length).toBe(1);
});
