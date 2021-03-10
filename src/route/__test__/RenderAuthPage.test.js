import 'jsdom-global/register';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import RenderAuthPage from '../RenderAuthPage';

Enzyme.configure({ adapter: new Adapter() });

const mockPath = jest.fn();
const setup = (props = { path: mockPath }) => shallow(<RenderAuthPage {...props} />);

const findByTest = (wrapper, val) => wrapper.find(`[data-testid="${val}"]`);

test('renders routed of Auth Page', () => {
    const wrapper = setup();
    const loginItem = findByTest(wrapper, 'AuthPage_login');
    const forgotpasswordItem = findByTest(wrapper, 'AuthPage_forgot-password');
    const setPasswordItem = findByTest(wrapper, 'AuthPage_set-password');
    expect(loginItem.length).toBe(1);
    expect(forgotpasswordItem.length).toBe(1);
    expect(setPasswordItem.length).toBe(1);
});
