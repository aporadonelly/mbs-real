import 'jsdom-global/register';
import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Provider } from 'react-redux';
import { configure, mount } from 'enzyme';
import * as reactRedux from 'react-redux';
import toJson from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Login from '../../auth/Login';
import { userStatus } from '../../../reducers/constants';

configure({ adapter: new Adapter() });
jest.unmock('react-redux');

const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');

const mockHistoryPush = jest.fn();

beforeEach(() => {
    useSelectorMock.mockClear();
});

const mockStore = configureMockStore({ thunk });

jest.mock('react-router-dom', () => ({
    useRouteMatch: jest.fn().mockReturnValue({
        location: '/'
    }),
    useHistory: () => ({
        push: mockHistoryPush
    })
}));

beforeEach(() => {
    mockHistoryPush.mockClear();
});

describe('renders Login Page', () => {
    it('initial view', () => {
        const store = mockStore({
            auth: {
                username: '',
                password: '',
                status: userStatus.LOGGED_OUT,
                error: {
                    code: ''
                }
            }
        });
        const wrapper = mount(
            <Provider store={store}>
                <Login />
            </Provider>
        );

        expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('password change needed', () => {
        const store = mockStore({
            auth: {
                username: '',
                password: '',
                status: userStatus.PASSWORD_CHANGE_NEEDED,
                error: {
                    code: ''
                },
                isFormSubmitted: true
            }
        });
        const wrapper = mount(
            <Provider store={store}>
                <Login />
            </Provider>
        );

        expect(toJson(wrapper)).toMatchSnapshot();
        expect(mockHistoryPush.mock.calls.length).toBe(1);
        expect(mockHistoryPush.mock.calls[0][0]).toBe('set-password');
    });
});
