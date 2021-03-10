import 'jsdom-global/register';
import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import * as reactRedux from 'react-redux';
import { Provider } from 'react-redux';
import { configure, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ForgotPassword from '../../auth/ForgotPassword';
import { ForgotPasswordForm } from '../../../components';

configure({ adapter: new Adapter() });
jest.unmock('react-redux');

const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');

beforeEach(() => {
    useSelectorMock.mockClear();
});

const mockStore = configureMockStore({ thunk });

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
    useRouteMatch: jest.fn().mockReturnValue({
        location: '/'
    }),
    useHistory: () => ({
        push: mockHistoryPush
    })
}));

describe('renders ForgotPassword Page', () => {
    it('initial view', () => {
        const store = mockStore({
            auth: {
                username: '',
                forgotPasswordError: {
                    code: ''
                }
            }
        });
        const wrapper = mount(
            <Provider store={store}>
                <ForgotPassword />
            </Provider>
        );

        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find(ForgotPasswordForm).exists()).toMatchSnapshot();
    });

    it('limit exceeded exception', () => {
        const store = mockStore({
            auth: {
                username: '',
                forgotPasswordError: {
                    code: ''
                },
                isForgotPasswordFormSubmitted: true
            }
        });
        const wrapper = mount(
            <Provider store={store}>
                <ForgotPassword />
            </Provider>
        );

        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find(ForgotPasswordForm).exists()).toMatchSnapshot();
        expect(mockHistoryPush.mock.calls.length).toBe(1);
        expect(mockHistoryPush.mock.calls[0][0]).toBe('set-password');
    });
});
