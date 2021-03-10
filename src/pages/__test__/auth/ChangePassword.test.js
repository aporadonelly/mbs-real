import 'jsdom-global/register';
import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import * as reactRedux from 'react-redux';
import { Provider } from 'react-redux';
import { configure, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ChangePassword from '../../auth/ChangePassword';
import { ChangePasswordForm, SuccessMessage } from '../../../components';

configure({ adapter: new Adapter() });
jest.unmock('react-redux');

const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');

beforeEach(() => {
    useSelectorMock.mockClear();
});

const mockStore = configureMockStore([thunk]);

const mockHistoryPush = jest.fn();

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

describe('renders ChangePassword Page', () => {
    it('Shows change password form', () => {
        // mock auth reducer state
        const store = mockStore({
            auth: {
                username: '',
                changePasswordError: {
                    code: ''
                }
            }
        });

        const wrapper = mount(
            <Provider store={store}>
                <ChangePassword />
            </Provider>
        );

        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find(ChangePasswordForm).exists()).toBeTruthy();
        expect(wrapper.find(SuccessMessage).exists()).toBeFalsy();
    });

    it('Shows success message', () => {
        // mock auth reducer state
        const store = mockStore({
            auth: {
                username: '',
                changePasswordError: {
                    code: ''
                },
                isChangePasswordSuccess: true,
                renderChangePassword: true
            }
        });

        const wrapper = mount(
            <Provider store={store}>
                <ChangePassword />
            </Provider>
        );

        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find(SuccessMessage).exists()).toBeTruthy();
        expect(wrapper.find(ChangePasswordForm).exists()).toBeFalsy();
    });
});
